import { BadRequestException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import axios from 'axios';
import * as sharp from 'sharp';
import * as crypto from 'crypto';

import { GalleryService } from '../gallery/gallery.service';
import * as FormData from 'form-data';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class ColorizationService {
  private queue: (() => Promise<void>)[] = [];
  private concurrency = 1;
  private current = 0;

  constructor(
    private readonly galleryService: GalleryService,
    private readonly imageService: ImageService,
  ) {}

  async enqueue(file: Express.Multer.File, authorId: string) {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await this.processFile(file, authorId);
          resolve(result);
        } catch (e) {
          reject(e instanceof Error ? e : new Error(String(e)));
        } finally {
          this.current--;
          this.runNext();
        }
      });

      this.runNext();
    });
  }

  private runNext() {
    if (this.current >= this.concurrency) return;
    const next = this.queue.shift();
    if (next) {
      this.current++;
      void next();
    }
  }

  private async processFile(file: Express.Multer.File, authorId: string) {
    const buffer = file.buffer;
    const start = Date.now();

    const image = sharp(buffer);
    const metadata = await image.metadata();

    if (!metadata.format || !['jpeg', 'png', 'jpg'].includes(metadata.format)) {
      throw new BadRequestException(
        'Поддерживаются только изображения jpeg, jpg или png',
      );
    }

    if (buffer.length > 10 * 1024 * 1024) {
      throw new BadRequestException('Файл слишком большой (>5MB)');
    }

    if (
      typeof metadata.width !== 'number' ||
      typeof metadata.height !== 'number' ||
      metadata.width > 10000 ||
      metadata.height > 10000
    ) {
      throw new BadRequestException(
        'Изображение слишком большое. Максимум: 10000x10000 px',
      );
    }

    const form = new FormData();
    form.append('file', buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const response = await axios.post(
      'http://nginx:80/api/colorization/v1/colorize',
      form,
      {
        headers: form.getHeaders(),
        responseType: 'arraybuffer',
      },
    );

    const outputBuffer = Buffer.from(response.data);
    const duration = (Date.now() - start) / 1000;

    const originalAvatar = await this.imageService.saveImage(file);
    const colorizedAvatar = await this.imageService.saveImage({
      ...file,
      buffer: outputBuffer,
      size: outputBuffer.length,
    });

    const gallery = await this.galleryService.create({
      title: '',
      originalId: originalAvatar.id.toString(),
      colorizedId: colorizedAvatar.id.toString(),
      originalUrl: `/images/${originalAvatar.id}`,
      colorizedUrl: `/images/${colorizedAvatar.id}`,
      fileSize: buffer.length,
      processingTime: duration,
      dimensions: `${metadata.width}x${metadata.height}`,
      rating: 0,
      public: false,
      uuid: crypto.randomUUID(),
      author: new Types.ObjectId(authorId),
    });

    return {
      id: gallery._id,
      uuid: gallery.uuid,
      title: gallery.title,
      originalUrl: `/images/${originalAvatar._id}`,
      colorizedUrl: `/images/${colorizedAvatar._id}`,
      dimensions: gallery.dimensions,
      fileSize: gallery.fileSize,
      public: gallery.public,
      rating: gallery.rating,
      processingTime: gallery.processingTime,
      author: gallery.author,
    };
  }
}

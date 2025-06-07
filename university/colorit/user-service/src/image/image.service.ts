import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './schemas/image.schema';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
  ) {}

  async saveImage(
    file: Express.Multer.File,
    userId?: string,
  ): Promise<ImageDocument> {
    return this.imageModel.create({
      data: file.buffer,
      mimetype: file.mimetype,
      size: file.size,
      userId,
    });
  }

  async getImage(id: string): Promise<Image | null> {
    return this.imageModel.findById(id);
  }
}

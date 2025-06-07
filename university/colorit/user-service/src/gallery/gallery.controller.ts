import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  NotFoundException,
  UseGuards,
  Query,
  Req,
  Delete,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  async getPublicGallery(@Query('page') page = 1, @Query('limit') limit = 12) {
    const result = await this.galleryService.findPublicPaginated(+page, +limit);
    return {
      ...result,
      items: result.items.map((item) => ({
        id: item._id.toString(),
        title: item.title,
        uuid: item.uuid,
        originalUrl: item.originalUrl,
        colorizedUrl: item.colorizedUrl,
        dimensions: item.dimensions,
        fileSize: item.fileSize,
        processingTime: item.processingTime,
        rating: item.rating,
        public: item.public,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        author: item.author
          ? {
            id: item.author._id?.toString(),
            fullName: item.author.fullName ?? '',
            avatarUrl: item.author.avatarUrl ?? '',
          }
          : null,
      })),
    };
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async getMyGallery(
    @Req() req: Request,
    @Query('page') page = 1,
    @Query('limit') limit = 12,
  ) {
    const user = req.user as { userId: string };

    const result = await this.galleryService.findUserPaginated(
      user.userId,
      +page,
      +limit,
    );
    return {
      ...result,
      items: result.items.map((item) => ({
        id: item._id.toString(),
        title: item.title,
        uuid: item.uuid,
        originalUrl: item.originalUrl,
        colorizedUrl: item.colorizedUrl,
        dimensions: item.dimensions,
        fileSize: item.fileSize,
        processingTime: item.processingTime,
        rating: item.rating,
        public: item.public,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        author: item.author
          ? {
            id: item.author._id?.toString(),
            fullName: item.author.fullName ?? '',
            avatarUrl: item.author.avatarUrl ?? '',
          }
          : null,
      })),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getUserStats(@Req() req: Request) {
    const user = req.user as { userId: string };
    return this.galleryService.getUserStats(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(id);
  }

  @Patch(':id/title')
  updateTitle(@Param('id') id: string, @Body('title') title: string) {
    return this.galleryService.updateById(id, { title });
  }

  @Patch(':id/public')
  updatePublic(@Param('id') id: string, @Body('public') isPublic: boolean) {
    return this.galleryService.updateById(id, { public: isPublic });
  }

  @Patch(':id/rating')
  updateRating(@Param('id') id: string, @Body('rating') rating: number) {
    return this.galleryService.updateById(id, { rating });
  }

  @Get('uuid/:uuid')
  async getByUuid(@Param('uuid') uuid: string) {
    const doc = await this.galleryService
      .findByUuid(uuid)
      .then((d) => d?.populate('author'));
    if (!doc) {
      throw new NotFoundException('Изображение не найдено');
    }

    const gallery = doc.toObject();

    return {
      id: gallery._id.toString(),
      title: gallery.title,
      uuid: gallery.uuid,
      originalUrl: gallery.originalUrl,
      colorizedUrl: gallery.colorizedUrl,
      dimensions: gallery.dimensions,
      fileSize: gallery.fileSize,
      processingTime: gallery.processingTime,
      rating: gallery.rating,
      public: gallery.public,
      createdAt: gallery.createdAt,
      updatedAt: gallery.updatedAt,
      author: gallery.author
        ? {
          id: gallery.author._id?.toString(),
          fullName: gallery.author.fullName ?? '',
          avatarUrl: gallery.author.avatarUrl ?? '',
        }
        : null,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteById(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as { userId: string };

    const item = await this.galleryService.findById(id);

    if (!item) {
      throw new NotFoundException('Изображение не найдено');
    }

    if (item.author.toString() !== user.userId) {
      throw new NotFoundException('Вы не можете удалить чужое изображение');
    }

    await this.galleryService.deleteById(id);

    return { success: true };
  }
}

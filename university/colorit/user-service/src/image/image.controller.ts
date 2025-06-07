import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Res,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const image = await this.imageService.saveImage(file, req.user?.userId);
    return { id: image._id };
  }

  @Get(':id')
  async get(@Param('id') id: string, @Res() res: Response) {
    const image = await this.imageService.getImage(id);
    if (!image) {
      return res.status(404).send('Not found');
    }
    res.set('Content-Type', image.mimetype);
    res.send(image.data);
  }
}

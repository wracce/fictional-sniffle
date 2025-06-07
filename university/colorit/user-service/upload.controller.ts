import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { v4 as uuidv4 } from 'uuid';
  import { extname } from 'path';
  import { Express } from 'express'; // ✅ добавь это

  
  @Controller('upload')
  export class UploadController {
    @Post('avatar')
    @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, cb) => {
          const unique = uuidv4() + extname(file.originalname);
          cb(null, unique);
        },
      }),
    }))
    uploadAvatar(@UploadedFile() file: Express.Multer.File) {
      return { url: `/uploads/avatars/${file.filename}` };
    }
  }
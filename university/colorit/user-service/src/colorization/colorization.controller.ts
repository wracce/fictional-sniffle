import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ColorizationService } from './colorization.service';
import { Express, Request } from 'express';
import { ApiConsumes, ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Colorization')
@Controller('colorize')
export class ColorizationController {
  constructor(private readonly colorizationService: ColorizationService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({ status: 201, description: 'Успешно колоризировано' })
  @ApiResponse({
    status: 400,
    description: 'Файл обязателен или некорректный формат',
  })
  async colorize(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (!file) {
      throw new BadRequestException('Файл обязателен');
    }

    const user = req.user as { userId: string };
    console.log('User ID:', user.userId);

    try {
      return await this.colorizationService.enqueue(file, user.userId);
    } catch (error) {
      throw new BadRequestException('Произошла ошибка при колоризации файла' + error);
    }
  }
}

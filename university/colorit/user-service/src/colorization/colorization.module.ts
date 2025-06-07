import { Module } from '@nestjs/common';
import { ColorizationController } from './colorization.controller';
import { ColorizationService } from './colorization.service';
import { GalleryModule } from '../gallery/gallery.module';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [GalleryModule, ImageModule],
  controllers: [ColorizationController],
  providers: [ColorizationService],
})
export class ColorizationModule {}

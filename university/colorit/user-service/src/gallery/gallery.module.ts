import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { Gallery, GallerySchema } from './schemas/gallery.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gallery.name, schema: GallerySchema }]),
    UsersModule,
  ],
  controllers: [GalleryController],
  providers: [GalleryService],
  exports: [GalleryService], // чтобы использовать в других модулях
})
export class GalleryModule {}

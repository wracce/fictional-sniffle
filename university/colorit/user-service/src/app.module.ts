import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ColorizationModule } from './colorization/colorization.module';
import { GalleryModule } from './gallery/gallery.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    UsersModule,
    AuthModule,
    ImageModule,
    ColorizationModule,
    GalleryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

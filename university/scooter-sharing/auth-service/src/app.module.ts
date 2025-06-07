import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ConsulService } from './sd/consul.service';
import { ConsulController } from './sd/consul.controller';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
  ],
  controllers: [ConsulController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ConsulService,
  ],
})
export class AppModule { }

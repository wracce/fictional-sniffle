import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { UsersController } from './users/users.controller';
import { ConsulService } from './sd/consul.service';
import { ConsulController } from './sd/consul.controller';
import { LoggerService } from './logger/logger.service';
import { LoggerController } from './logger/logger.controller';
import {  RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UsersModule,
  ],
  controllers: [UsersController, ConsulController, LoggerController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ConsulService,
  ],
  exports: []
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ConsulController } from './sd/consul.controller';
import { ConsulModule } from './sd/consule.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { LoggerService } from './logger/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    ConsulModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: process.env.BROKER_URL || 'amqp://user:password@broker:5672',
      exchanges: [
        {
          name: process.env.BROKER_EXCHANGE || 'reqeusts',
          type: 'topic',
        }
      ],
    }
    ),
  ],
  controllers: [ConsulController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    LoggerService
  ],
})
export class AppModule {}

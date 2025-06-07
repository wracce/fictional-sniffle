import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { LoggerService } from 'src/logger/logger.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: process.env.BROKER_URL || 'amqp://user:password@scooters-broker:5672',
      exchanges: [
        {
          name: process.env.BROKER_EXCHANGE || 'reqeusts',
          type: 'topic',
        }
      ],
    }
    ),
  ],
  providers: [UsersService,LoggerService],
  controllers: [],
  exports: [UsersService,LoggerService],
})
export class UsersModule {}

import { Injectable } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class LoggerService {
  @RabbitSubscribe({
    exchange:  process.env.BROKER_EXCHANGE || 'reqeusts',
    routingKey: '',
    queue: process.env.BROKER_QUEUE || 'reqeusts',
  })
  handleMessage(msg: { message: string }) { 
    console.log(new Date().toISOString(), msg.message);
  }
}
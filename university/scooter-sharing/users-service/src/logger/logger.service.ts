import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class LoggerService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async sendMessageToQueue(message: string) {
    const queue = process.env.BROKER_QUEUE || 'reqeusts';

    await this.amqpConnection.publish(queue, '', { message });
    
    console.log('Отправлено сообщение: ', message);
    return `Отправлено сообщение: ${message}`;
  }
}




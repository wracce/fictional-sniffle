import { Controller, Post, Body } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ApiOperation, ApiResponse, ApiBody, ApiProperty, ApiBearerAuth } from '@nestjs/swagger';

class LogMessageDto {
  @ApiProperty({
    description: 'Message to be logged to the queue',
    type: String,
  })
  message: string;
}

@Controller('log')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Post()
  @ApiBearerAuth('jwt-token')
  @ApiOperation({ summary: 'Log a message to the queue' })
  @ApiBody({
    description: 'Log message in JSON format',
    type: LogMessageDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Message successfully logged',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request format',
  })
  async logMessage(@Body() logMessageDto: LogMessageDto) {
    this.loggerService.sendMessageToQueue(logMessageDto.message);
  }
}
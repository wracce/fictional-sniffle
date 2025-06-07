import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestDto {
  @ApiProperty({ description: 'The value to be processed', example: 'some string' })
  @IsString()
  value: string;
}
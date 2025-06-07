import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsDate,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  readonly password: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  readonly firstname: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsOptional()
  @IsString()
  readonly middlename?: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  readonly lastname: string;

  @ApiPropertyOptional({ example: '+1234567890' })
  @IsOptional()
  @IsPhoneNumber(null)
  readonly phone?: string;

  @ApiPropertyOptional({ example: '1990-01-01' })
  @IsOptional()
  @IsDate()
  readonly birthday?: Date;

  @ApiPropertyOptional({ example: '123 Main St' })
  @IsOptional()
  @IsString()
  readonly address?: string;
}

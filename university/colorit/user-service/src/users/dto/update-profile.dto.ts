import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUrl,
  IsObject,
  IsPhoneNumber,
  IsDate,
  IsDateString,
} from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPhoneNumber('RU', { message: 'Номер телефона некорректен' })
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl({}, { message: 'Некорректный URL' })
  website?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  jobTitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  company?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    type: 'object',
    properties: {
      twitter: { type: 'string' },
      instagram: { type: 'string' },
      linkedin: { type: 'string' },
    },
  })
  @IsOptional()
  @IsObject()
  social?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };

  @ApiPropertyOptional({ type: 'string', format: 'date-time' })
  @IsDateString()
  createdAt: Date;

  @ApiPropertyOptional({ type: 'string', format: 'date-time' })
  @IsDateString()
  updatedAt: Date;
}

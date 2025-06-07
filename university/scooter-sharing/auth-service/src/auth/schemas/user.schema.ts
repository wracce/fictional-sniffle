import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @ApiProperty({ example: 'user@example.com', description: 'Email пользователя' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Пароль пользователя' })
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

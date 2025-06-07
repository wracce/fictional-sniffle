import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @ApiProperty({ example: 'user@example.com', description: 'Email пользователя' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: '20000', description: 'Количество денег пользователя' })
  @Prop({ default: 20000 })
  money: number;

  @ApiProperty({ example: 'password123', description: 'Пароль пользователя' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @Prop({ required: true })
  firstname: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество пользователя' })
  @Prop()
  middlename: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  @Prop({ required: true })
  lastname: string;

  @ApiProperty({ example: '+7 (123) 456-78-90', description: 'Телефон пользователя' })
  @Prop()
  phone: string;

  @ApiProperty({ example: '1990-01-01', description: 'Дата рождения пользователя' })
  @Prop()
  birthday: Date;

  @ApiProperty({ example: 'Москва, ул. Ленина, 1', description: 'Адрес пользователя' })
  @Prop()
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
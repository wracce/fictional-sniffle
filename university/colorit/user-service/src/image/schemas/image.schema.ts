import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Image {
  @Prop({ required: true })
  data: Buffer;

  @Prop()
  mimetype: string;

  @Prop()
  size: number;

  @Prop()
  userId?: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
export type ImageDocument = Image & Document;

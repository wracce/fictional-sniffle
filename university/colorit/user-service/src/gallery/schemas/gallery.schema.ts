import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type GalleryDocument = Gallery & Document;

@Schema({ timestamps: true })
export class Gallery {
  @Prop({ default: '' })
  title: string;

  @Prop({ required: true })
  originalId: string;

  @Prop({ required: true })
  colorizedId: string;

  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true })
  colorizedUrl: string;

  @Prop({ required: true })
  dimensions: string;

  @Prop({ required: true })
  fileSize: number;

  @Prop({ required: true })
  processingTime: number;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: false })
  public: boolean;

  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId; // ← исправили тут
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);

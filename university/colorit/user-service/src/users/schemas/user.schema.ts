import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop() fullName?: string;
  @Prop() phone?: string;
  @Prop() website?: string;
  @Prop() jobTitle?: string;
  @Prop() company?: string;
  @Prop() location?: string;
  @Prop() avatarUrl?: string;
  @Prop() bio?: string;
  @Prop({
    type: {
      twitter: String,
      instagram: String,
      linkedin: String,
    },
  })
  social?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

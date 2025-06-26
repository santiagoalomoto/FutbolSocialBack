import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserPreferences extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop()
  theme: string;

  @Prop()
  color: string;

  @Prop()
  font: string;

  @Prop()
  backgroundImage?: string;
}

export const UserPreferencesSchema = SchemaFactory.createForClass(UserPreferences);

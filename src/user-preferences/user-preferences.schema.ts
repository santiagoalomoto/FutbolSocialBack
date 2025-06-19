import { Schema } from 'mongoose';

export const UserPreferenceSchema = new Schema({
  userId: { type: Number, required: true }, // ID de usuario relacional
  theme: { type: String, default: 'light' },
  font: { type: String, default: 'Arial' },
  color: { type: String, default: '#00ffc1' },
  updatedAt: { type: Date, default: Date.now },
});

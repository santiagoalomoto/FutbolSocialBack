import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreferences } from './user-preferences.schema';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectModel(UserPreferences.name)
    private readonly model: Model<UserPreferences>,
  ) {}

  create(data: Partial<UserPreferences>) {
    return this.model.create(data);
  }

  findByUserId(userId: string) {
    return this.model.findOne({ userId }).exec();
  }

  updateByUserId(userId: string, data: Partial<UserPreferences>) {
    return this.model.findOneAndUpdate(
      { userId },
      data,
      { new: true, upsert: true }
    ).exec();
  }
}

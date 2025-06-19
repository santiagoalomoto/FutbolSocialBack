import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectModel('UserPreference') private prefModel: Model<any>,
  ) {}

  async createOrUpdate(userId: number, data: any) {
    return this.prefModel.findOneAndUpdate(
      { userId },
      { ...data, updatedAt: new Date() },
      { upsert: true, new: true }
    );
  }

  async getByUserId(userId: number) {
    return this.prefModel.findOne({ userId });
  }
}

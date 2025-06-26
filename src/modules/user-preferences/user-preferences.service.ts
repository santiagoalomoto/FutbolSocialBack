import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreferences } from './user-preferences.schema';
import { LoggerService } from '../../logger/logger.service'; // importa LoggerService

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectModel(UserPreferences.name)
    private readonly model: Model<UserPreferences>,

    private readonly logger: LoggerService, // inyecta LoggerService
  ) {}

  create(data: Partial<UserPreferences>) {
    this.logger.log('Creating user preferences');
    return this.model.create(data);
  }

  findByUserId(userId: string) {
    this.logger.log(`Finding user preferences for userId: ${userId}`);
    return this.model.findOne({ userId }).exec();
  }

  updateByUserId(userId: string, data: Partial<UserPreferences>) {
    this.logger.log(`Updating user preferences for userId: ${userId}`);
    return this.model.findOneAndUpdate(
      { userId },
      data,
      { new: true, upsert: true }
    ).exec();
  }
}

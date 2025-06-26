
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreferences } from './user-preferences.schema';
import { LoggerService } from '../../logger/logger.service';
import { UserPreferencesResponseDto } from './dto/user-preferences-response.dto';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectModel(UserPreferences.name)
    private readonly model: Model<UserPreferences>,

    private readonly logger: LoggerService, // inyecta LoggerService
  ) {}


  async create(data: Partial<UserPreferences>): Promise<UserPreferencesResponseDto> {
    this.logger.log('Creating user preferences');
    const created = await this.model.create(data);
    return this.toResponseDto(created);
  }


  async findByUserId(userId: string): Promise<UserPreferencesResponseDto> {
    this.logger.log(`Finding user preferences for userId: ${userId}`);
    const found = await this.model.findOne({ userId }).exec();
    return found ? this.toResponseDto(found) : ({} as UserPreferencesResponseDto);
  }


  async updateByUserId(userId: string, data: Partial<UserPreferences>): Promise<UserPreferencesResponseDto> {
    this.logger.log(`Updating user preferences for userId: ${userId}`);
    const updated = await this.model.findOneAndUpdate(
      { userId },
      data,
      { new: true, upsert: true }
    ).exec();
    return this.toResponseDto(updated);
  }

  private toResponseDto(pref: UserPreferences): UserPreferencesResponseDto {
    const { userId, theme, color, font, backgroundImage } = pref;
    return { userId, theme, color, font, backgroundImage };
  }
}

import { Module } from '@nestjs/common';
import { UserPreferencesService } from './user-preferences.service';
import { UserPreferencesController } from './user-preferences.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPreferenceSchema } from './user-preferences.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserPreference', schema: UserPreferenceSchema },
    ]),
  ],
  controllers: [UserPreferencesController],
  providers: [UserPreferencesService],
})
export class UserPreferencesModule {}


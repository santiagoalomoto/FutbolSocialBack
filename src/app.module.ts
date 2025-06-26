import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/env.config';

import { LoggerModule } from './logger/logger.module';
import { MorganMiddleware } from './middleware/morgan.middleware';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TeamsModule } from './modules/teams/teams.module';
import { PlayersModule } from './modules/players/players.module';
import { RefereesModule } from './modules/referees/referees.module';
import { MatchesModule } from './modules/matches/matches.module';
import { NewsModule } from './modules/news/news.module';
import { StandingsModule } from './modules/standings/standings.module';
import { UserPreferencesModule } from './modules/user-preferences/user-preferences.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    LoggerModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    TeamsModule,
    PlayersModule,
    RefereesModule,
    MatchesModule,
    NewsModule,
    StandingsModule,
    UserPreferencesModule,
    AdminModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}

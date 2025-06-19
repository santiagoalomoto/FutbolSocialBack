import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { PlayersModule } from './players/players.module';
import { RefereesModule } from './referees/referees.module';
import { MatchesModule } from './matches/matches.module';
import { NewsModule } from './news/news.module';
import { StandingsModule } from './standings/standings.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPreferencesModule } from './user-preferences/user-preferences.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'futbol',
      synchronize: true,
      autoLoadEntities: true,
    }),

    MongooseModule.forRoot('mongodb://localhost:27017/futbol-mongo'),
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
export class AppModule {}



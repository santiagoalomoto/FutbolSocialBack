
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefereesService } from './referees.service';
import { RefereesController } from './referees.controller';
import { Referee } from '../../entities/referee.entity';
import { LoggerModule } from '../../logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Referee]), LoggerModule],
  providers: [RefereesService],
  controllers: [RefereesController],
})
export class RefereesModule {}
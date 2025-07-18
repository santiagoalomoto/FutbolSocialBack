import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from './team.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  league: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  time: string;

  @Column({ default: 'Programado' })
  status: string;

  @ManyToOne(() => Team, { nullable: true, onDelete: 'SET NULL' })
  team1: Team;

  @ManyToOne(() => Team, { nullable: true, onDelete: 'SET NULL' })
  team2: Team;

  @Column({ default: 0 })
  score_team1: number;

  @Column({ default: 0 })
  score_team2: number;
}
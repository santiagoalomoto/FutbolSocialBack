import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Team } from './team.entity';

@Entity()
export class Standing {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Team)
  @JoinColumn()
  team: Team;

  @Column({ default: 0 })
  played: number;

  @Column({ default: 0 })
  wins: number;

  @Column({ default: 0 })
  draws: number;

  @Column({ default: 0 })
  losses: number;

  @Column({ default: 0 })
  goals_for: number;

  @Column({ default: 0 })
  goals_against: number;

  @Column({ default: 0 })
  goal_diff: number;

  @Column({ default: 0 })
  points: number;

  @Column({ nullable: true })
  position: number;
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from '../teams/team.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  photo_url: string;

  @ManyToOne(() => Team, (team) => team.id, { onDelete: 'SET NULL' })
  team: Team;

  @Column()
  position: string;

  @Column()
  number: number;

  @Column({ default: 0 })
  goals: number;

  @Column({ default: 0 })
  yellow_cards: number;

  @Column({ default: 0 })
  red_cards: number;
}
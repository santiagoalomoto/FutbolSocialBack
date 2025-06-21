import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Referee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  photo_url: string;

  @Column()
  city: string;

  @Column()
  gender: string;

  @Column('text', { array: true })
  roles: string[]; // Ej: ['principal', 'asistente']

  @Column({ default: 0 })
  yellow_cards: number;

  @Column({ default: 0 })
  red_cards: number;
}
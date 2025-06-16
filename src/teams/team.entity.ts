import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  logo_url: string;

  @Column()
  division: string; // Ej: Primera División, Segunda División
}

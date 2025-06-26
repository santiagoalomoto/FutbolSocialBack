import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  emailHash: string;

  @Column()
  email: string; // email cifrado

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ nullable: true })
  name: string;
}

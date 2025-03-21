import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'; // Decorator

@Entity() // Entity
export class User {
  @PrimaryGeneratedColumn() // PK & Auto Increase
  id?: number;

  @Column({ unique: true }) // Column, unique
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) // Default value
  createdAt: Date = new Date();
}

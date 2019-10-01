import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { Compagny } from '../Compagny/Compagny.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', nullable: false })
  public firstName: string;

  @Column({ type: 'varchar', nullable: false })
  public lastName: string;

  @Column({ type: 'varchar', nullable: false })
  public email: string;

  @Column({ type: 'varchar', nullable: false })
  public password: string;

  @Index('api-token')
  @Column({ type: 'text', nullable: true })
  public apiToken: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @ManyToOne(type => Compagny, { nullable: true })
  public currentCompagny: Compagny;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}

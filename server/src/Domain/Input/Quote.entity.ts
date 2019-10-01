import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../User/User.entity';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', nullable: false })
  public sentence: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @ManyToOne(type => User, { nullable: false })
  public author: User;

  @ManyToOne(type => User, { nullable: false })
  public addedBy: User;

  constructor(quote: Partial<Quote>) {
    Object.assign(this, quote);
  }
}

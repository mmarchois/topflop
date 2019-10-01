import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../User/User.entity';

export enum InputType {
  FLOP = 'flop',
  TOP = 'top',
}

@Entity()
export class Input {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'enum', enum: InputType, nullable: false })
  public type: InputType;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @ManyToOne(type => User, { nullable: false })
  public author: User;

  @ManyToOne(type => User, { nullable: false })
  public addedBy: User;

  constructor(input: Partial<Input>) {
    Object.assign(this, input);
  }
}

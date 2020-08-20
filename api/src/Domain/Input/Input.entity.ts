import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {User} from '../User/User.entity';
import {Compagny} from '../Compagny/Compagny.entity';

export enum InputType {
  FLOP = 'flop',
  TOP = 'top'
}

@Entity()
export class Input {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({type: 'enum', enum: InputType, nullable: false})
  public type: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  public createdAt: Date;

  @ManyToOne((type) => User, {nullable: false})
  public author: User;

  @ManyToOne((type) => User, {nullable: false})
  public addedBy: User;

  @ManyToOne((type) => Compagny, {nullable: false})
  public compagny: Compagny;

  constructor(input: Partial<Input>) {
    Object.assign(this, input);
  }
}

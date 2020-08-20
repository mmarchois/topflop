import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {User} from './User.entity';
import {Compagny} from '../Compagny/Compagny.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

@Entity()
export class UserCompagny {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'enum', enum: UserRole, nullable: false})
  role: string;

  @ManyToOne((type) => Compagny, {nullable: false})
  compagny: Compagny;

  @ManyToOne((type) => User, {nullable: false})
  user: User;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  public createdAt: Date;

  constructor(userCompagny: Partial<UserCompagny>) {
    Object.assign(this, userCompagny);
  }
}

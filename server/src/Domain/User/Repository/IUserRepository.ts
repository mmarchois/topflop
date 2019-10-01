import { User } from '../User.entity';

export interface IUserRepository {
  findOneByEmail(email: string): Promise<User | null>;
  findOneByApiToken(apiToken: string): Promise<User | null>;
  save(user: User): Promise<User>;
}

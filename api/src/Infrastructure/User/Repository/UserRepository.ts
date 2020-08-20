import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {User} from 'src/Domain/User/User.entity';
import {IUserRepository} from 'src/Domain/User/Repository/IUserRepository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  public findOneByEmail = async (email: string): Promise<User | null> => {
    return await this.repository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.apiToken',
        'user.password',
        'compagny.id',
        'compagny.name'
      ])
      .leftJoin('user.currentCompagny', 'compagny')
      .where('user.email = :email', {email})
      .getOne();
  };

  public findOneByApiToken = async (apiToken: string): Promise<User | null> => {
    return await this.repository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'currentCompagny.id',
        'currentCompagny.name'
      ])
      .leftJoin('user.currentCompagny', 'currentCompagny')
      .where('user.apiToken = :apiToken', {apiToken})
      .getOne();
  };

  public findOneById = async (id: string): Promise<User | null> => {
    return await this.repository
      .createQueryBuilder('user')
      .select(['user.id', 'user.firstName', 'user.lastName', 'compagny.id'])
      .where('user.id = :id', {id})
      .innerJoin('user.currentCompagny', 'compagny')
      .getOne();
  };

  public save = async (user: User): Promise<User> => {
    return await this.repository.save(user);
  };
}

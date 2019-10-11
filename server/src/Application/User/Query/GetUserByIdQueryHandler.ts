import { QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { Inject } from '@nestjs/common';
import { User } from 'src/Domain/User/User.entity';
import { GetUserByIdQuery } from './GetUserByIdQuery';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public execute = async (query: GetUserByIdQuery): Promise<User | null> => {
    return await this.userRepository.findOneById(query.id);
  };
}

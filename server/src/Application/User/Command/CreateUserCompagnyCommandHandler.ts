import { CommandHandler } from '@nestjs/cqrs';
import { CreateUserCompagnyCommand } from './CreateUserCompagnyCommand';
import { IUserCompagnyRepository } from 'src/Domain/User/Repository/IUserCompagnyRepository';
import { Inject } from '@nestjs/common';
import { UserCompagny } from 'src/Domain/User/UserCompagny.entity';

@CommandHandler(CreateUserCompagnyCommand)
export class CreateUserCompagnyCommandHandler {
  constructor(
    @Inject('IUserCompagnyRepository')
    private readonly repository: IUserCompagnyRepository,
  ) {}

  public execute = async (
    command: CreateUserCompagnyCommand,
  ): Promise<UserCompagny> => {
    const { user, compagny, role } = command;

    return await this.repository.save(
      new UserCompagny({
        user,
        compagny,
        role,
      }),
    );
  };
}

import { CommandHandler } from '@nestjs/cqrs';
import { Inject, ForbiddenException } from '@nestjs/common';
import { ChangeCurrentCompagnyCommand } from './ChangeCurrentCompagnyCommand';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { IsMemberOfCompagny } from 'src/Domain/User/IsMemberOfCompagny';
import { IUserCompagnyRepository } from 'src/Domain/User/Repository/IUserCompagnyRepository';
import { UserView } from '../View/UserView';

@CommandHandler(ChangeCurrentCompagnyCommand)
export class ChangeCurrentCompagnyCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly repository: IUserRepository,
    @Inject('IUserCompagnyRepository')
    private readonly userCompagnyRepository: IUserCompagnyRepository,
    private readonly isMemberOfCompagny: IsMemberOfCompagny,
  ) {}

  public execute = async (
    command: ChangeCurrentCompagnyCommand,
  ): Promise<UserView> => {
    const { user, compagny } = command;

    if (
      false === (await this.isMemberOfCompagny.isSatisfiedBy(user, compagny))
    ) {
      throw new ForbiddenException('not.member.of.compagny');
    }

    // Used to retrieve the user role in this compagny
    const userCompagny = await this.userCompagnyRepository.findOneByUserAndCompagny(
      user,
      compagny,
    );

    user.updateCurrentCompagny(compagny);
    await this.repository.save(user);

    return new UserView(user, compagny, userCompagny.role);
  };
}

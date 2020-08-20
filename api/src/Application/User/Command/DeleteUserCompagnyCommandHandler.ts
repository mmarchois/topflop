import {CommandHandler} from '@nestjs/cqrs';
import {Inject, BadRequestException} from '@nestjs/common';
import {DeleteUserCompagnyCommand} from './DeleteUserCompagnyCommand';
import {IsMemberOfCompagny} from 'src/Domain/User/IsMemberOfCompagny';
import {IsAdminOfCompagny} from 'src/Domain/User/IsAdminOfCompagny';
import {IUserCompagnyRepository} from 'src/Domain/User/Repository/IUserCompagnyRepository';
import {IUserRepository} from 'src/Domain/User/Repository/IUserRepository';

@CommandHandler(DeleteUserCompagnyCommand)
export class DeleteUserCompagnyCommandHandler {
  constructor(
    @Inject('IUserCompagnyRepository')
    private readonly userCompagnyRepository: IUserCompagnyRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly isMemberOfCompagny: IsMemberOfCompagny,
    private readonly isAdminOfCompagny: IsAdminOfCompagny
  ) {}

  public execute = async (
    command: DeleteUserCompagnyCommand
  ): Promise<void> => {
    const {loggedUser, user} = command;
    const compagny = loggedUser.currentCompagny;

    if (loggedUser === user) {
      throw new BadRequestException('user.errors.deleteItself');
    }

    if (
      false ===
      (await this.isAdminOfCompagny.isSatisfiedBy(loggedUser, compagny))
    ) {
      throw new BadRequestException('user.errors.notAdmin');
    }

    if (
      false === (await this.isMemberOfCompagny.isSatisfiedBy(user, compagny))
    ) {
      throw new BadRequestException('user.errors.notMember');
    }

    if (user.currentCompagny.id === compagny.id) {
      user.updateCurrentCompagny(null);
      await this.userRepository.save(user);
    }

    await this.userCompagnyRepository.deleteByUserAndCompagny(user, compagny);
  };
}

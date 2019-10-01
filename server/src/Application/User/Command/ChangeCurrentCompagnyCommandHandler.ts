import { CommandHandler } from '@nestjs/cqrs';
import { Inject, ForbiddenException } from '@nestjs/common';
import { ChangeCurrentCompagnyCommand } from './ChangeCurrentCompagnyCommand';
import { CompagnyView } from 'src/Application/Compagny/View/CompagnyView';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { IsMemberOfCompagny } from 'src/Domain/User/IsMemberOfCompagny';
import { IUserCompagnyRepository } from 'src/Domain/User/Repository/IUserCompagnyRepository';
import { ChangeCurrentCompagnyView } from '../View/ChangeCurrentCompagnyView';

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
  ): Promise<ChangeCurrentCompagnyView> => {
    const { user, compagny } = command;

    if (
      false === (await this.isMemberOfCompagny.isSatisfiedBy(user, compagny))
    ) {
      throw new ForbiddenException('not.member.of.compagny');
    }

    const userCompagny = await this.userCompagnyRepository.findOneByUserAndCompagny(
      user,
      compagny,
    );

    user.updateCurrentCompagny(compagny);
    await this.repository.save(user);

    return new ChangeCurrentCompagnyView(
      userCompagny.role,
      new CompagnyView(compagny.id, compagny.name),
    );
  };
}

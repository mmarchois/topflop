import {CommandHandler} from '@nestjs/cqrs';
import {LeaveCompagnyCommand} from './LeaveCompagnyCommand';
import {IUserCompagnyRepository} from 'src/Domain/User/Repository/IUserCompagnyRepository';
import {Inject, BadRequestException} from '@nestjs/common';
import {IsMemberOfCompagny} from 'src/Domain/User/IsMemberOfCompagny';
import {IInputRepository} from 'src/Domain/Input/Repository/IInputRepository';
import {IQuoteRepository} from 'src/Domain/Input/Repository/IQuoteRepository';

@CommandHandler(LeaveCompagnyCommand)
export class LeaveCompagnyCommandHandler {
  constructor(
    @Inject('IUserCompagnyRepository')
    private readonly userCompagnyRepository: IUserCompagnyRepository,
    @Inject('IInputRepository')
    private readonly inputRepository: IInputRepository,
    @Inject('IQuoteRepository')
    private readonly quoteRepository: IQuoteRepository,
    private readonly isMemberOfCompagny: IsMemberOfCompagny
  ) {}

  public execute = async (command: LeaveCompagnyCommand): Promise<void> => {
    const {compagny, user} = command;

    if (
      false === (await this.isMemberOfCompagny.isSatisfiedBy(user, compagny))
    ) {
      throw new BadRequestException('user.errors.notMember');
    }

    await this.userCompagnyRepository.deleteByUserAndCompagny(user, compagny);
    await this.inputRepository.deleteByUserAndCompagny(user, compagny);
    await this.quoteRepository.deleteByUserAndCompagny(user, compagny);
  };
}

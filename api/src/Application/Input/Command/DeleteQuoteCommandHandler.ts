import {CommandHandler} from '@nestjs/cqrs';
import {DeleteQuoteCommand} from './DeleteQuoteCommand';
import {IQuoteRepository} from 'src/Domain/Input/Repository/IQuoteRepository';
import {Inject, BadRequestException} from '@nestjs/common';
import {Quote} from 'src/Domain/Input/Quote.entity';
import {IsAdminOfCompagny} from 'src/Domain/User/IsAdminOfCompagny';

@CommandHandler(DeleteQuoteCommand)
export class DeleteQuoteCommandHandler {
  constructor(
    @Inject('IQuoteRepository')
    private readonly quoteRepository: IQuoteRepository,
    private readonly isAdminOfCompagny: IsAdminOfCompagny
  ) {}

  public execute = async (command: DeleteQuoteCommand): Promise<void> => {
    const {
      query: {id, user}
    } = command;

    const quote = await this.quoteRepository.findById(id);
    if (!(quote instanceof Quote)) {
      throw new BadRequestException('quote.errors.notFound');
    }

    if (
      false ===
      (await this.isAdminOfCompagny.isSatisfiedBy(user, quote.compagny))
    ) {
      throw new BadRequestException('errors.quote.notAllowed');
    }

    await this.quoteRepository.delete(quote);
  };
}

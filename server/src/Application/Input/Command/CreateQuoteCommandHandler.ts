import { CommandHandler } from '@nestjs/cqrs';
import { CreateQuoteCommand } from './CreateQuoteCommand';
import { IQuoteRepository } from 'src/Domain/Input/Repository/IQuoteRepository';
import { Inject, BadRequestException } from '@nestjs/common';
import { IsMemberOfCompagny } from 'src/Domain/User/IsMemberOfCompagny';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { User } from 'src/Domain/User/User.entity';
import { Quote } from 'src/Domain/Input/Quote.entity';
import { QuoteView } from '../View/QuoteView';
import { UsernameView } from 'src/Application/User/View/UsernameView';

@CommandHandler(CreateQuoteCommand)
export class CreateQuoteCommandHandler {
  constructor(
    @Inject('IQuoteRepository')
    private readonly repository: IQuoteRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,

    private readonly isMemberOfCompagny: IsMemberOfCompagny,
  ) {}

  public execute = async (command: CreateQuoteCommand): Promise<QuoteView> => {
    const { user, sentence, authorId } = command;
    const compagny = user.currentCompagny;

    const author = await this.userRepository.findOneById(authorId);
    if (!(author instanceof User)) {
      throw new BadRequestException('user.errors.notFound');
    }

    if (
      false === (await this.isMemberOfCompagny.isSatisfiedBy(author, compagny))
    ) {
      throw new BadRequestException('user.errors.notMember');
    }

    const quote = await this.repository.save(
      new Quote({
        sentence,
        compagny,
        author,
        addedBy: user,
      }),
    );

    return new QuoteView(
      quote.id,
      sentence,
      quote.createdAt,
      new UsernameView(author.firstName, author.lastName),
    );
  };
}

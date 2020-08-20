import {IQuoteRepository} from 'src/Domain/Input/Repository/IQuoteRepository';
import {Inject, NotFoundException, ForbiddenException} from '@nestjs/common';
import {QueryHandler} from '@nestjs/cqrs';
import {GetQuotesByIdQuery} from './GetQuotesByIdQuery';
import {Quote} from 'src/Domain/Input/Quote.entity';
import {QuoteView} from '../View/QuoteView';
import {UsernameView} from 'src/Application/User/View/UsernameView';
import {IsMemberOfCompagny} from 'src/Domain/User/IsMemberOfCompagny';

@QueryHandler(GetQuotesByIdQuery)
export class GetQuotesByIdQueryHandler {
  constructor(
    @Inject('IQuoteRepository')
    private readonly repository: IQuoteRepository,
    private readonly isMemberOfCompagny: IsMemberOfCompagny
  ) {}

  public execute = async (query: GetQuotesByIdQuery): Promise<QuoteView> => {
    const {id, user} = query;

    const quote = await this.repository.findById(id);
    if (!(quote instanceof Quote)) {
      throw new NotFoundException('quote.errors.notFound');
    }

    const {author, compagny} = quote;
    if (
      false === (await this.isMemberOfCompagny.isSatisfiedBy(user, compagny))
    ) {
      throw new ForbiddenException('quote.errors.notAllow');
    }

    return new QuoteView(
      quote.id,
      quote.sentence,
      quote.createdAt,
      new UsernameView(author.firstName, author.lastName)
    );
  };
}

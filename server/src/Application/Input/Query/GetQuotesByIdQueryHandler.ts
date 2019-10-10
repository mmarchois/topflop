import { IQuoteRepository } from 'src/Domain/Input/Repository/IQuoteRepository';
import { Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { GetQuotesByIdQuery } from './GetQuotesByIdQuery';
import { Quote } from 'src/Domain/Input/Quote.entity';
import { QuoteView } from '../View/QuoteView';
import { UsernameView } from 'src/Application/User/View/UsernameView';

@QueryHandler(GetQuotesByIdQuery)
export class GetQuotesByIdQueryHandler {
  constructor(
    @Inject('IQuoteRepository')
    private readonly repository: IQuoteRepository,
  ) {}

  public execute = async (query: GetQuotesByIdQuery): Promise<QuoteView> => {
    const { id, user } = query;

    const quote = await this.repository.findById(id);
    if (!(quote instanceof Quote)) {
      throw new NotFoundException('quote.errors.notFound');
    }
    const { author, compagny } = quote;

    if (compagny.id !== user.currentCompagny.id) {
      throw new ForbiddenException('quote.errors.notAllow');
    }

    return new QuoteView(
      quote.id,
      quote.sentence,
      quote.createdAt,
      new UsernameView(author.firstName, author.lastName),
    );
  };
}

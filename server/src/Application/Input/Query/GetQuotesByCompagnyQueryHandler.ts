import { IQuoteRepository } from 'src/Domain/Input/Repository/IQuoteRepository';
import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { GetQuotesByCompagnyQuery } from './GetQuotesByCompagnyQuery';
import { Pagination } from 'src/Application/Common/Pagination';
import { QuoteView } from '../View/QuoteView';
import { UsernameView } from 'src/Application/User/View/UsernameView';

@QueryHandler(GetQuotesByCompagnyQuery)
export class GetQuotesByCompagnyQueryHandler {
  constructor(
    @Inject('IQuoteRepository')
    private readonly repository: IQuoteRepository,
  ) {}

  public execute = async (
    query: GetQuotesByCompagnyQuery,
  ): Promise<Pagination<QuoteView>> => {
    const { compagny, filters } = query;

    const quoteViews = [];
    const [quotes, total] = await this.repository.findByCompagny(
      compagny,
      filters,
    );

    for (const quote of quotes) {
      const { id, author, sentence, createdAt } = quote;

      quoteViews.push(
        new QuoteView(
          id,
          sentence,
          createdAt,
          new UsernameView(author.firstName, author.lastName),
        ),
      );
    }

    return new Pagination<QuoteView>(quoteViews, total);
  };
}

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Quote } from 'src/Domain/Input/Quote.entity';
import { IQuoteRepository } from 'src/Domain/Input/Repository/IQuoteRepository';
import { Compagny } from 'src/Domain/Compagny/Compagny.entity';
import { MAX_ITEMS_PER_PAGE } from 'src/Application/Common/Pagination';
import { QuoteFiltersDto } from '../Controller/Dto/QuoteFiltersDto';

@Injectable()
export class QuoteRepository implements IQuoteRepository {
  constructor(
    @InjectRepository(Quote)
    private readonly repository: Repository<Quote>,
  ) {}

  public save = async (quote: Quote): Promise<Quote> => {
    return await this.repository.save(quote);
  };

  public findByCompagny = async (
    compagny: Compagny,
    filters: QuoteFiltersDto,
  ): Promise<[Quote[], number]> => {
    return await this.repository
      .createQueryBuilder('quote')
      .select([
        'quote.id',
        'quote.sentence',
        'quote.createdAt',
        'author.firstName',
        'author.lastName',
      ])
      .innerJoin('quote.author', 'author')
      .where('quote.compagny = :compagny', { compagny: compagny.id })
      .orderBy('quote.createdAt', 'DESC')
      .limit(MAX_ITEMS_PER_PAGE)
      .offset((filters.page - 1) * MAX_ITEMS_PER_PAGE)
      .getManyAndCount();
  };
}

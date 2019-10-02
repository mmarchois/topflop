import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Quote } from 'src/Domain/Input/Quote.entity';
import { IQuoteRepository } from 'src/Domain/Input/Repository/IQuoteRepository';

@Injectable()
export class QuoteRepository implements IQuoteRepository {
  constructor(
    @InjectRepository(Quote)
    private readonly repository: Repository<Quote>,
  ) {}

  public save = async (quote: Quote): Promise<Quote> => {
    return await this.repository.save(quote);
  };
}

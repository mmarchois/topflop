import { Quote } from '../Quote.entity';
import { Compagny } from 'src/Domain/Compagny/Compagny.entity';
import { QuoteFiltersDto } from 'src/Infrastructure/Input/Controller/Dto/QuoteFiltersDto';

export interface IQuoteRepository {
  save(quote: Quote): Promise<Quote>;
  findByCompagny(
    compagny: Compagny,
    filters: QuoteFiltersDto,
  ): Promise<[Quote[], number]>;
}

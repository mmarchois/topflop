import { Quote } from '../Quote.entity';

export interface IQuoteRepository {
  save(quote: Quote): Promise<Quote>;
}

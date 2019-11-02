import { Inject } from '@nestjs/common';
import { INotifierAdapter } from 'src/Application/Adapter/INotifierAdapter';
import { Quote } from '../Quote.entity';

export class QuoteNotifier {
  constructor(
    @Inject('INotifierAdapter')
    private readonly notifier: INotifierAdapter,
  ) {}

  public notify = async (quote: Quote) => {
    const {
      author: { firstName, lastName },
      compagny,
    } = quote;

    this.notifier.notify(compagny, 'quotes', {
      key: 'quote.notify',
      user: `${firstName} ${lastName}`,
    });
  };
}

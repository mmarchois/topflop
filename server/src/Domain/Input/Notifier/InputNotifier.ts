import { Inject } from '@nestjs/common';
import { INotifierAdapter } from 'src/Application/Adapter/INotifierAdapter';
import { Input } from '../Input.entity';

export class InputNotifier {
  constructor(
    @Inject('INotifierAdapter')
    private readonly notifier: INotifierAdapter,
  ) {}

  public notify = async (input: Input) => {
    const {
      author: { firstName, lastName },
      compagny,
      type,
    } = input;

    this.notifier.notify(compagny, 'inputs', {
      key: `input.notify.${type}`,
      user: `${firstName} ${lastName}`,
    });
  };
}
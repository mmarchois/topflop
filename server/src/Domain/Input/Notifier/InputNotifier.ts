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
      compagny: { id },
      type,
    } = input;

    const payload = {
      key: `input.notify.${type}`,
      user: `${firstName} ${lastName}`,
    };

    this.notifier.notify(`compagny/${id}/inputs`, payload);
  };
}

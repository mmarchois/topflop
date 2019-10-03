import { UsernameView } from 'src/Application/User/View/UsernameView';

export class InputView {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly createdAt: Date,
    public readonly author: UsernameView,
  ) {}
}

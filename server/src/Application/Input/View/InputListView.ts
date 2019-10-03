import { UsernameView } from 'src/Application/User/View/UsernameView';

export class InputListView {
  constructor(
    public readonly counter: number,
    public readonly author: UsernameView,
  ) {}
}

import {UsernameView} from 'src/Application/User/View/UsernameView';

export class QuoteView {
  constructor(
    public readonly id: string,
    public readonly sentence: string,
    public readonly createdAt: Date,
    public readonly author: UsernameView
  ) {}
}

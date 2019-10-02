import { UsernameView } from 'src/Application/User/View/UsernameView';

export class QuoteView {
  constructor(
    public sentence: string,
    public createdAt: Date,
    public author: UsernameView,
  ) {}
}

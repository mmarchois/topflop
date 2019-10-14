import { ICommand } from 'src/Application/ICommand';
import { GetQuotesByIdQuery } from '../Query/GetQuotesByIdQuery';

export class DeleteQuoteCommand implements ICommand {
  constructor(public readonly query: GetQuotesByIdQuery) {}
}

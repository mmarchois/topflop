import { IQuery } from 'src/Application/IQuery';

export class GetUserByApiToken implements IQuery {
  constructor(public readonly apiToken: string) {}
}

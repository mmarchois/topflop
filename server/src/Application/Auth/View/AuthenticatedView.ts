import { UserView } from 'src/Application/User/View/UserView';

export class AuthenticatedView {
  constructor(
    public readonly user: UserView,
    public readonly apiToken: string,
  ) {}
}

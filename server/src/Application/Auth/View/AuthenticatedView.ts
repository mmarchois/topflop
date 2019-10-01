import { CompagnyView } from 'src/Application/Compagny/View/CompagnyView';

export class AuthenticatedView {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly apiToken: string,
    public readonly compagny?: CompagnyView,
  ) {}
}

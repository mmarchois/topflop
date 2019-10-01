import { CompagnyView } from 'src/Application/Compagny/View/CompagnyView';

export class ChangeCurrentCompagnyView {
  constructor(
    public readonly role: string,
    public readonly compagny: CompagnyView,
  ) {}
}

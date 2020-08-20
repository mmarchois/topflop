export class CompagnyView {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly voucher: string,
    public readonly role?: string
  ) {}
}

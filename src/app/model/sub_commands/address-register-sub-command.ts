export class AddressRegisterSubCommand {
  constructor(
    public street: string = '',
    public houseNumber: number = 0,
    public houseNumberPostfix: string | null = null,
    public postalCode: string = '',
    public domicile: string = '',
  ) {}
}

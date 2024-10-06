export class MemberUpdateAddressCommand {
  constructor(
    public street: string,
    public houseNumber: number,
    public houseNumberPostfix: string,
    public postalCode: string,
    public domicile: string,
  ) {}
}

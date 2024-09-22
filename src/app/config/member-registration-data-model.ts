export class MemberRegistrationDataModel {
  constructor(
    public firstName: String | null,
    public lastName: String | null,
    public emailAddress: String | null,
    public phoneNumber: String | null,
    public street: String | null,
    public houseNumber: number | null,
    public houseNumberPostfix: String | null,
    public postalCode: String | null,
    public domicile: String | null,
  ) {}

  static createEmpty(): MemberRegistrationDataModel {
    return new MemberRegistrationDataModel(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    );
  }
}

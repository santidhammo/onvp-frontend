export class FirstOperator {
  constructor(
    public firstName: String | null,
    public lastName: String | null,
    public email: String | null,
    public userName: String | null,
    public phoneNumber: String | null,
    public street: String | null,
    public houseNumber: String | null,
    public houseNumberPostfix: String | null,
    public postalCode: String | null,
    public domicile: String | null,
  ) {}

  static createEmpty(): FirstOperator {
    return new FirstOperator(
      null,
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

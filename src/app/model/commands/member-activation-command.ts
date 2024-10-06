export class MemberActivationCommand {
  constructor(
    public token: string = '',
    public activationString: string = '',
  ) {}
}

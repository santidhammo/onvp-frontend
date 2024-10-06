export class AuthorizationRequest {
  constructor(
    public emailAddress: string = '',
    public token: string = '',
  ) {}
}

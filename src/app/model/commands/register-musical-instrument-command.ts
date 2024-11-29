export class RegisterMusicalInstrumentCommand {
  constructor(
    public name: string = '',
    public wikipediaUrl: string | null = null,
  ) {}
}

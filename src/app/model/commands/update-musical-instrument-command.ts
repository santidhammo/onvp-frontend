export class UpdateMusicalInstrumentCommand {
  constructor(
    public name: string = '',
    public wikipediaUrl: string | null = null,
  ) {}
}

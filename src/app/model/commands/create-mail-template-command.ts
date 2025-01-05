export class CreateMailTemplateCommand {
  constructor(
    public name: string,
    public body: string,
  ) {}
}

import { EventDate } from '../../generic/primitive/event-date';

export class CreatePageCommand {
  constructor(
    public title: string = '',
    public eventDate: EventDate | null | undefined = null,
  ) {}
}

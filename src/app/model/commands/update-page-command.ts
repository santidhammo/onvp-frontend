import { EventDate } from '../../generic/primitive/event-date';

export class UpdatePageCommand {
  constructor(
    public title: string,
    public eventDate: EventDate | null,
  ) {}
}

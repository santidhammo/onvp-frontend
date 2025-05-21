import { EventDate } from '../../generic/primitive/event-date';
import { PageResponse } from '../responses/page-response';

export class UpdatePageCommand {
  constructor(
    public title: string | null = null,
    public eventDate: EventDate | null = null,
    public endEventDate: EventDate | null = null,
  ) {}

  setup(pageResponse: PageResponse | null) {
    if (pageResponse) {
      this.title = pageResponse.title;
      if (pageResponse.eventDate !== undefined) {
        this.eventDate = pageResponse.eventDate;
      } else {
        this.eventDate = null;
      }
      if (pageResponse.endEventDate !== undefined) {
        this.endEventDate = pageResponse.endEventDate;
      } else {
        this.endEventDate = null;
      }
    }
  }
}

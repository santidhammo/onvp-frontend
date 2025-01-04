import { EventDate } from '../../generic/primitive/event-date';

export interface PageResponse {
  id: number;
  title: string;
  eventDate: EventDate | null | undefined;
  orderNumber: number;
}

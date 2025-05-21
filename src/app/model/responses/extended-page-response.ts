import { Role } from '../../generic/primitive/role';
import { PageResponse } from './page-response';
import { EventDate } from '../../generic/primitive/event-date';

export interface ExtendedPageResponse extends PageResponse {
  id: number;
  title: string;
  eventDate: EventDate | null | undefined;
  orderNumber: number;
  roles: Role[];
  parentId: number | null | undefined;
  endEventDate: EventDate | null | undefined;
}

import { Role } from '../../generic/primitive/role';
import { EventDate } from './event-date';

export interface ExtendedPageResponse {
  id: number;
  title: string;
  eventDate: EventDate | null | undefined;
  roles: Role[];
}

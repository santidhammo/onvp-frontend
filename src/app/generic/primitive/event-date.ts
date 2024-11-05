import { EventDate as EventDateInterface } from './event-date';

export class EventDate implements EventDateInterface {
  constructor(
    public day: string,
    public month: string,
    public year: number,
  ) {}
}

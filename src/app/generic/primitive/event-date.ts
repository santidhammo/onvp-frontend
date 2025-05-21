export class EventDate {
  constructor(
    public day: number,
    public month: number,
    public year: number,
  ) {}

  /**
   * Get the browser's representation of the current date as EventDate instance
   *
   * @return An instance representing today
   */
  static today(): EventDate {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    return new EventDate(day, month, year);
  }
}

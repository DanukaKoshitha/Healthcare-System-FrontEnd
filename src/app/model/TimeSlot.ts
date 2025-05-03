export class TimeSlot{

  id : number;
  day: DayOfWeek;
  startTime: string;
  endTime: string;

  constructor(id: number , day: DayOfWeek, startTime: string , endTime : string){
    this.id = id;
    this.day = day;
    this.startTime = this.formatTime(startTime);
    this.endTime = this.formatTime(endTime);
  }

  private formatTime(time: string): string {
    if (!time.match(/^\d{2}:\d{2}$/)) {
      throw new Error(`Invalid time format. Expected "HH:mm", got "${time}"`);
    }
    return time;
  }

  static DayOfWeek = {
    MONDAY: 'MONDAY',
    TUESDAY: 'TUESDAY',
    WEDNESDAY: 'WEDNESDAY',
    THURSDAY: 'THURSDAY',
    FRIDAY: 'FRIDAY',
    SATURDAY: 'SATURDAY',
    SUNDAY: 'SUNDAY'
  } as const;
}

export type DayOfWeek = keyof typeof TimeSlot.DayOfWeek;

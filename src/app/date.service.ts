import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  convertToTimezone(date: Date, tz: string): Date {
    var dateInTz = new Date(date.toLocaleString('en-US', { timeZone: tz }))
    var diff = date.getTime() - dateInTz.getTime()
    return new Date(date.getTime() - diff)
  }
}

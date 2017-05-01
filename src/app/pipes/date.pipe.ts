import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'dateTransform'
})
export class DatePipe implements PipeTransform {
  public transform (date: string) {
    const dateTime = new Date(date);
    const year = dateTime.getFullYear();
    const currentMonth = dateTime.getMonth() + 1;
    const month = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
    const day = dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : dateTime.getDate();
    return `${day}/${month}/${year}`;
  }
}

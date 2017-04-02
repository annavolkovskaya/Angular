import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'durationTransform'
})
export class DurationPipe implements PipeTransform {
  public transform (duration: number) {
    const minutesInHour = 60;
    const hours = Math.floor(duration / minutesInHour)
      ? `${Math.floor(duration / minutesInHour)}h`
      : '';
    const minutes = duration % minutesInHour
      ? `${duration % minutesInHour}min`
      : '';
    return `${hours} ${minutes}`;
  }
}

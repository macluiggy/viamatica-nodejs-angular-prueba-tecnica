import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timezone',
  standalone: true,
})
export class TimezonePipe implements PipeTransform {
  transform(value: string, offset: number): string {
    if (!value) return '';
    const date = new Date(value);
    date.setHours(date.getHours() + offset);
    return date.toLocaleString();
  }
}

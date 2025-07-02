import { Constants } from '../util/constants';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DateFormatPipe',
  standalone: true
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  override transform(value: any, args?: any): any {
    if (!value) return null;
    // Se for string no formato brasileiro
    if (typeof value === 'string' && value.includes('/')) {
      // Espera 'DD/MM/YYYY HH:mm:ss' ou 'DD/MM/YYYY'
      const [datePart, timePart] = value.split(' ');
      const [day, month, year] = datePart.split('/').map(Number);
      let hours = 0, minutes = 0, seconds = 0;
      if (timePart) {
        [hours, minutes, seconds] = timePart.split(':').map(Number);
        if (isNaN(seconds)) seconds = 0;
      }
      value = new Date(year, month - 1, day, hours, minutes, seconds);
    }
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      return '';
    }
    return super.transform(value, Constants.DATE_TIME_FMT);
  }
}

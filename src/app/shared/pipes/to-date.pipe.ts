import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({ name: 'toDate', pure: true })
export class ToDatePipe implements PipeTransform {
  transform(value: Date | Timestamp | null): Date | null {
    if (!value) {
      return null;
    }
    if (value instanceof Timestamp) {
      return value.toDate();
    }
    return value as Date;
  }
}

import { Directive, effect, HostBinding, Input, signal } from '@angular/core';
import { Priority, Status } from '../enums';
import {
  DEFAULT_COLOR,
  priorityColors,
  statusColors,
} from '../constants/colors';

@Directive({
  selector: '[nskrColor]',
})
export class ColorDirective {
  @HostBinding('style.background-color') backgroundColor!: string | null;

  private prioritySignal = signal<Priority | null>(null);
  private statusSignal = signal<Status | null>(null);
  private colorSignal = signal<string | null>(null);

  @Input()
  set priority(value: Priority | null) {
    this.prioritySignal.set(value);
  }

  @Input()
  set status(value: Status | null) {
    this.statusSignal.set(value);
  }

  constructor() {
    effect(() => {
      const priority = this.prioritySignal();
      const status = this.statusSignal();

      if (priority !== null && priority !== undefined) {
        this.colorSignal.set(priorityColors[priority] || DEFAULT_COLOR);
      } else if (status !== null && status !== undefined) {
        this.colorSignal.set(statusColors[status] || DEFAULT_COLOR);
      } else {
        throw new Error(
          '[nskrColor]: Either priority or status must be provided.',
        );
      }

      this.backgroundColor = this.colorSignal();
    });
  }
}

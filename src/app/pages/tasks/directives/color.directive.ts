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
  @Input() priority?: Priority | null;
  @Input() status?: Status | null;
  private colorSignal = signal<string | null>(null);

  constructor() {
    effect(() => {
      if (this.priority) {
        this.colorSignal.set(priorityColors[this.priority] || DEFAULT_COLOR);
      } else if (this.status) {
        this.colorSignal.set(statusColors[this.status] || DEFAULT_COLOR);
      } else {
        throw new Error(
          '[nskrColor]: Either priority or status must be provided.',
        );
      }

      this.backgroundColor = this.colorSignal();
    });
  }
}

import { Component, inject } from '@angular/core';
import { TasksMediatorService } from '../../services/tasks-mediator.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'nskr-task-filter',
  imports: [],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss',
})
export class TaskFilterComponent {
  private taskMediator: TasksMediatorService = inject(TasksMediatorService);
  private store: Store = inject(Store);
}

import { Component, inject } from '@angular/core';
import { TasksMediatorService } from '../../services/tasks-mediator.service';
import { Observable } from 'rxjs';
import {
  selectFilterStatus,
  selectSearchQuery,
} from '../../state/tasks.selectors';
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

  filterStatus$: Observable<string> = this.store.select(selectFilterStatus);
  searchQuery$: Observable<string> = this.store.select(selectSearchQuery);
}

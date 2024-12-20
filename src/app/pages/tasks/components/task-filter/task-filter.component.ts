import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SortDirection, Status } from '../../enums';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription, take, throttleTime } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  bulkUpdateTasks,
  clearFilters,
  selectAllTasks,
  setFilters,
} from '../../state/tasks.actions';
import { Filters } from '../../interfaces';
import { MatButton } from '@angular/material/button';
import {
  selectAreAllTasksSelected,
  selectAreSomeTasksSelected,
  selectSelectedTasks,
} from '../../state/tasks.selectors';
import { AsyncPipe } from '@angular/common';
import { priorityMap } from '../utils/priority-map';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Task } from '../../interfaces';

@Component({
  selector: 'nskr-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatCheckbox,
    MatButton,
    AsyncPipe,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
})
export class TaskFilterComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  statuses = ['all', ...Object.values(Status)];
  priorities = priorityMap();
  sortDirections = Object.values(SortDirection);
  sortBy = ['creationDate', 'dueDate', 'priority', 'status'];

  initFormState = {
    sortBy: 'creationDate',
    sortDirection: this.sortDirections[0],
    status: 'all',
    priority: 'all',
    searchQuery: '',
  };
  filterForm = this.fb.group({
    ...this.initFormState,
  });

  filtersSub$!: Subscription;

  areAllTasksSelected$ = this.store.select(selectAreAllTasksSelected);
  areSomeTasksSelected$ = this.store.select(selectAreSomeTasksSelected);
  selectedTasks$ = this.store.select(selectSelectedTasks);

  ngOnInit() {
    this.filtersSub$ = this.filterForm.valueChanges
      .pipe(throttleTime(100))
      .subscribe((filters) => {
        this.store.dispatch(setFilters(filters as Filters));
      });
  }

  toggleSelectAll(selected: boolean) {
    this.store.dispatch(selectAllTasks({ selected }));
  }

  markSelectedAsDone(): void {
    this.selectedTasks$.pipe(take(1)).subscribe((result: Task[]) => {
      const taskIds = result.map((task) => task.id);
      this.store.dispatch(
        bulkUpdateTasks({
          taskIds,
          updatedFields: {
            status: Status.DONE,
            completionDate: new Date(),
          },
        }),
      );
    });
  }

  clearFilters() {
    this.filterForm.setValue({ ...this.initFormState });
    this.store.dispatch(clearFilters());
  }

  ngOnDestroy() {
    this.filtersSub$.unsubscribe();
  }
}

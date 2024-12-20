import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Priority, SortDirection, Status } from '../../enums';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription, throttleTime } from 'rxjs';
import { Store } from '@ngrx/store';
import { clearFilters, setFilters } from '../../state/tasks.actions';
import { Filters } from '../../interfaces';
import { MatButton } from '@angular/material/button';

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
  ],
})
export class TaskFilterComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  statuses = ['all', ...Object.values(Status)];
  priorities = ['all', ...Object.keys(Priority)];
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

  ngOnInit() {
    this.filtersSub$ = this.filterForm.valueChanges
      .pipe(throttleTime(300))
      .subscribe((filters) => {
        this.store.dispatch(setFilters(filters as Filters));
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

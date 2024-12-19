import { Component, inject, OnInit } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { PageComponent } from '@core/base/page';
import { Store } from '@ngrx/store';
import {
  selectFilteredAndSearchedTasks,
  selectFilterStatus,
  selectLoading,
  selectSearchQuery,
} from './state/tasks.selectors';
import {
  bulkUpdateTasks,
  createTask,
  deleteTask,
  loadTasks,
  setFilterStatus,
  setSearchQuery,
  updateTask,
} from './state/tasks.actions';
import { Task } from './interfaces';
import { AsyncPipe } from '@angular/common';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { Observable, take } from 'rxjs';
import { Priority, Status } from './enums';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';

@Component({
  selector: 'nskr-tasks',
  imports: [
    UserComponent,
    AsyncPipe,
    LoadingComponent,
    TaskListComponent,
    TaskFilterComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent extends PageComponent implements OnInit {
  private store: Store = inject(Store);

  tasks$: Observable<Task[]> = this.store.select(
    selectFilteredAndSearchedTasks,
  );
  loading$: Observable<boolean> = this.store.select(selectLoading);
  filterStatus$: Observable<string> = this.store.select(selectFilterStatus);
  searchQuery$: Observable<string> = this.store.select(selectSearchQuery);

  userId!: string;
  selectedTasks: string[] = [];

  ngOnInit(): void {
    this.route.paramMap.pipe(take(1)).subscribe((params) => {
      this.userId = params.get('uid') || '';
      if (this.userId !== '') {
        this.store.dispatch(loadTasks({ userId: this.userId }));
        this.fakeAddTask();
      }
    });
  }

  addTask(task: Partial<Task>): void {
    const newTask: Task = {
      id: '',
      creationDate: new Date(),
      completionDate: null,
      checkMark: false,
      ...task,
    } as Task;
    this.store.dispatch(createTask({ userId: this.userId, task: newTask }));
  }

  updateTask(task: Task): void {
    const updatedTask: Partial<Task> = { ...task, status: Status.DONE };
    this.store.dispatch(
      updateTask({ userId: this.userId, taskId: task.id, updatedTask }),
    );
  }

  deleteTask(taskId: string): void {
    this.store.dispatch(deleteTask({ userId: this.userId, taskId }));
  }

  bulkUpdate(): void {
    const updatedFields: Partial<Task> = { priority: Priority.HIGH };
    this.store.dispatch(
      bulkUpdateTasks({
        userId: this.userId,
        taskIds: this.selectedTasks,
        updatedFields,
      }),
    );
  }

  setFilter(filterStatus: 'all' | Status): void {
    this.store.dispatch(setFilterStatus({ filterStatus }));
  }

  setSearch(searchQuery: string): void {
    this.store.dispatch(setSearchQuery({ searchQuery }));
  }

  fakeAddTask(): void {
    const task: Task = {
      id: '',
      description: 'New Task',
      dueDate: new Date(),
      creationDate: new Date(),
      // checkMark: false,
      completionDate: null,
      priority: Priority.MEDIUM,
      status: Status.IN_PROGRESS,
    };

    this.store.dispatch(createTask({ userId: this.userId, task }));
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { PageComponent } from '@core/base/page';
import { Store } from '@ngrx/store';
import {
  selectError,
  selectLoading,
  selectTasks,
} from './state/tasks.selectors';
import {
  createTask,
  deleteTask,
  loadTasks,
  updateTask,
} from './state/tasks.actions';
import { Task } from './interfaces';
import { AsyncPipe } from '@angular/common';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'nskr-tasks',
  imports: [UserComponent, AsyncPipe, LoadingComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent extends PageComponent implements OnInit {
  private store = inject(Store);

  tasks$ = this.store.select(selectTasks);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  userId!: string;

  ngOnInit(): void {
    this.userId = 'user-id';
    this.store.dispatch(loadTasks({ userId: this.userId }));
  }

  addTask(task: Task): void {
    this.store.dispatch(createTask({ userId: this.userId, task }));
  }

  editTask(taskId: string, updatedTask: Partial<Task>): void {
    this.store.dispatch(
      updateTask({ userId: this.userId, taskId, updatedTask }),
    );
  }

  removeTask(taskId: string): void {
    this.store.dispatch(deleteTask({ userId: this.userId, taskId }));
  }
}

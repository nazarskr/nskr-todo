import { Component, inject, OnInit } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { PageComponent } from '@core/base/page';
import { Store } from '@ngrx/store';
import {
  selectFilteredAndSortedTasks,
  selectLoading,
} from './state/tasks.selectors';
import {
  bulkUpdateTasks,
  createTask,
  deleteTask,
  loadTasks,
  updateTask,
} from './state/tasks.actions';
import { Task } from './interfaces';
import { AsyncPipe } from '@angular/common';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { Observable } from 'rxjs';
import { Priority, Status } from './enums';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TaskAddEditComponent } from './components/task-add-edit/task-add-edit.component';

@Component({
  selector: 'nskr-tasks',
  imports: [
    UserComponent,
    AsyncPipe,
    LoadingComponent,
    TaskListComponent,
    TaskFilterComponent,
    MatButton,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent extends PageComponent implements OnInit {
  private store: Store = inject(Store);
  private dialog: MatDialog = inject(MatDialog);

  tasks$: Observable<Task[]> = this.store.select(selectFilteredAndSortedTasks);
  loading$: Observable<boolean> = this.store.select(selectLoading);

  selectedTasks: string[] = [];

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskAddEditComponent);

    dialogRef.afterClosed().subscribe((result: Task | undefined) => {
      if (result) this.addTask(result);
    });
  }

  addTask(task: Partial<Task>): void {
    const newTask: Task = {
      creationDate: new Date(),
      completionDate: null,
      ...task,
    } as Task;
    this.store.dispatch(createTask({ task: newTask }));
  }

  updateTask(task: Task): void {
    const updatedTask: Partial<Task> = { ...task, status: Status.DONE };
    this.store.dispatch(updateTask({ taskId: task.id, updatedTask }));
  }

  deleteTask(taskId: string): void {
    this.store.dispatch(deleteTask({ taskId }));
  }

  bulkUpdate(): void {
    const updatedFields: Partial<Task> = { priority: Priority.HIGH };
    this.store.dispatch(
      bulkUpdateTasks({
        taskIds: this.selectedTasks,
        updatedFields,
      }),
    );
  }
}

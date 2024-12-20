import { Component, inject, OnInit } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { PageComponent } from '@core/base/page';
import { Store } from '@ngrx/store';
import { selectFilteredAndSortedTasks } from './state/tasks.selectors';
import { createTask, loadTasks } from './state/tasks.actions';
import { Task } from './interfaces';
import { Observable } from 'rxjs';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TaskAddEditComponent } from './components/task-add-edit/task-add-edit.component';

@Component({
  selector: 'nskr-tasks',
  imports: [UserComponent, TaskListComponent, TaskFilterComponent, MatButton],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent extends PageComponent implements OnInit {
  private store: Store = inject(Store);
  private dialog: MatDialog = inject(MatDialog);

  tasks$: Observable<Task[]> = this.store.select(selectFilteredAndSortedTasks);

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
}

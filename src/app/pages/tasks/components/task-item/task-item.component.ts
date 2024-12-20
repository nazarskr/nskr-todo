import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Task } from '../../interfaces';
import { MatCardModule } from '@angular/material/card';
import { MatMiniFabButton } from '@angular/material/button';
import { ColorDirective } from '../../directives/color.directive';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TaskAddEditComponent } from '../task-add-edit/task-add-edit.component';
import { Store } from '@ngrx/store';
import {
  updateTask,
  deleteTask,
  toggleTaskSelection,
} from '../../state/tasks.actions';
import { TaskDeleteComponent } from '../task-delete/task-delete.component';
import { DatePipe } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { ToDatePipe } from '@shared/pipes/to-date.pipe';

@Component({
  selector: 'nskr-task-item',
  imports: [
    MatCardModule,
    ColorDirective,
    MatIcon,
    MatMiniFabButton,
    DatePipe,
    MatCheckbox,
    ToDatePipe,
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  private dialog: MatDialog = inject(MatDialog);
  private store: Store = inject(Store);

  @Input() task!: Task;

  toggleTaskSelection(value: boolean) {
    this.store.dispatch(
      toggleTaskSelection({ id: this.task.id, selected: value }),
    );
  }

  openEditTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskAddEditComponent, {
      data: {
        ...this.task,
      },
    });

    dialogRef.afterClosed().subscribe((result: Task | undefined) => {
      if (result) this.updateTask(result);
    });
  }

  updateTask(task: Task): void {
    const updatedTask: Partial<Task> = { ...task };
    this.store.dispatch(updateTask({ taskId: this.task.id, updatedTask }));
  }

  openDeleteTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDeleteComponent, {
      data: {
        id: this.task.id,
      },
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result) this.deleteTask(result);
    });
  }

  deleteTask(taskId: string): void {
    this.store.dispatch(deleteTask({ taskId }));
  }
}

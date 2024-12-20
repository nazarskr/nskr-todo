import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'nskr-task-delete',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIcon,
    MatMiniFabButton,
    MatDialogClose,
  ],
  templateUrl: './task-delete.component.html',
  styleUrl: './task-delete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDeleteComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<TaskDeleteComponent>);

  confirmDelete() {
    this.dialogRef.close(this.data.id);
  }
}

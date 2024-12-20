import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'nskr-task-delete',
  imports: [MatDialogModule, MatIcon, MatMiniFabButton],
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

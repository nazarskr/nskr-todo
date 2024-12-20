import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Priority, Status } from '../../enums';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { dueDateValidator, xssValidator } from '@shared/validators';
import { priorityMap } from '../../utils/priority-map';

@Component({
  selector: 'nskr-task-add-edit',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInput,
    MatSelect,
    MatOption,
    MatIcon,
    MatMiniFabButton,
  ],
  templateUrl: './task-add-edit.component.html',
  styleUrl: './task-add-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskAddEditComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<TaskAddEditComponent>);
  fb = inject(FormBuilder);

  statuses = Object.values(Status);
  priorities = priorityMap();

  taskForm = this.fb.group({
    description: [
      this.data?.description || '',
      [Validators.required, Validators.maxLength(200), xssValidator()],
    ],
    dueDate: [
      this.data?.dueDate || null,
      {
        validators: [dueDateValidator()],
        updateOn: 'blur',
      },
    ],
    creationDate: [
      { value: this.data?.creationDate || new Date(), disabled: true }, // Заблоковане поле
      Validators.required,
    ],
    completionDate: [
      { value: this.data?.completionDate || null, disabled: true }, // Заблоковане поле
    ],
    status: [this.data?.status || Status.TODO, Validators.required],
    priority: [this.data?.priority || Priority.LOW, Validators.required],
  });

  ngOnInit() {
    this.taskForm.get('status')?.valueChanges.subscribe((status: Status) => {
      if (status === Status.DONE) {
        this.taskForm.get('completionDate')?.setValue(new Date());
      } else {
        this.taskForm.get('completionDate')?.setValue(null);
      }
    });
  }

  onSave() {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.getRawValue());
    }
  }
}

import { Component, Input } from '@angular/core';
import { Task } from '../../interfaces';

@Component({
  selector: 'nskr-task-add-edit',
  imports: [],
  templateUrl: './task-add-edit.component.html',
  styleUrl: './task-add-edit.component.scss',
})
export class TaskAddEditComponent {
  @Input() task!: Task;
}

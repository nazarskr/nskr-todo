import { Component, inject, Input } from '@angular/core';
import { Task } from '../../interfaces';
import { TasksMediatorService } from '../../services/tasks-mediator.service';

@Component({
  selector: 'nskr-task-item',
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  private taskMediator: TasksMediatorService = inject(TasksMediatorService);

  @Input() task!: Task;
}

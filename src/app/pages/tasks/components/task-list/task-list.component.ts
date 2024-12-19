import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../interfaces';
import { AsyncPipe } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'nskr-task-list',
  imports: [AsyncPipe, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  @Input() tasks$!: Observable<Task[]>;
}

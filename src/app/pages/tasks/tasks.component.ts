import { Component } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { PageComponent } from '@core/base/page';

@Component({
  selector: 'nskr-tasks',
  imports: [UserComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent extends PageComponent {}

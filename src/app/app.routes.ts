import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PageTitle } from '@core/enums/page-title.enum';
import { TasksComponent } from './pages/tasks/tasks.component';

export const routes: Routes = [
  {
    path: 'tasks:uid',
    component: TasksComponent,
    title: PageTitle.TASKS,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth-routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

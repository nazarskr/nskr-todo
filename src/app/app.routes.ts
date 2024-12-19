import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PageTitle } from '@core/enums/page-title.enum';
import { TasksComponent } from './pages/tasks/tasks.component';
import { nonAuthGuard } from '@core/guards/non-auth.guard';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'tasks/:uid',
    component: TasksComponent,
    title: PageTitle.TASKS,
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth-routes').then((m) => m.authRoutes),
    canActivate: [nonAuthGuard],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: PageTitle.NOT_FOUND,
  },
];

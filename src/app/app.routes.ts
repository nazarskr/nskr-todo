import { Routes } from '@angular/router';
import { TodoComponent } from './pages/todo/todo.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PageTitle } from '@core/enums/page-title.enum';

export const routes: Routes = [
  {
    path: 'todo',
    component: TodoComponent,
    title: PageTitle.TODO,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth-routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    redirectTo: 'todo',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

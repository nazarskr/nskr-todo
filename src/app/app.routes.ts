import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PageTitle } from '@core/enums/page-title.enum';
import { TasksComponent } from './pages/tasks/tasks.component';
// import {
//   redirectUnauthorizedTo,
// } from '@angular/fire/auth-guard';
// import { nonAuthGuard } from '@core/guards/non-auth.guard';
// import {AngularFireAuthGuard} from '@angular/fire/compat/auth-guard';

export const routes: Routes = [
  {
    path: 'tasks/:uid',
    component: TasksComponent,
    title: PageTitle.TASKS,
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedTo(['/auth']) },
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth-routes').then((m) => m.authRoutes),
    // canActivate: [nonAuthGuard],
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

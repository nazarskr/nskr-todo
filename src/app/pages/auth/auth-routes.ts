import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';
import { PageTitle } from '@core/enums/page-title.enum';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: PageTitle.LOGIN,
  },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  //   title: PageTitle.REGISTER,
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

import { Component, inject } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { AuthService } from '@core/services/auth.service';
import { ToasterService } from '@shared/services/toaster.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'nskr-user',
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButton,
    AsyncPipe,
    MatDivider,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  private authService = inject(AuthService);
  private toasterService = inject(ToasterService);
  private router = inject(Router);

  currentUser$ = this.authService.currentUser$.pipe(map((user) => user?.email));

  email = 'somelongemail@gmail.com';
  logout(): void {
    this.authService.logout().then(() => {
      this.toasterService.showWarningMessage('User logged out');
      this.router.navigate(['/auth']);
    });
  }
}

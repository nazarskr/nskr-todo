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
  private _authService = inject(AuthService);
  private _toasterService = inject(ToasterService);
  private _router = inject(Router);

  currentUser$ = this._authService.currentUser$.pipe(
    map((user) => user?.email),
  );

  email = 'somelongemail@gmail.com';
  logout(): void {
    this._authService.logout().then(() => {
      this._toasterService.showWarningMessage('User logged out');
      this._router.navigate(['/auth']);
    });
  }
}

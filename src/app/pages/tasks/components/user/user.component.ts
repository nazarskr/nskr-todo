import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { AuthService } from '@core/services/auth.service';
import { ToasterService } from '@shared/services/toaster.service';
import { Router } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { User } from 'firebase/auth';

@Component({
  selector: 'nskr-user',
  imports: [MatCard, MatCardContent, MatCardActions, MatButton, MatDivider],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  private authService = inject(AuthService);
  private toasterService = inject(ToasterService);
  private router = inject(Router);

  currentUser!: User | null;

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.toasterService.showWarningMessage('User logged out');
      this.router.navigate(['/auth']);
    });
  }
}

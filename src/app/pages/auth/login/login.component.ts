import { Component, inject } from '@angular/core';
import { PageComponent } from '@core/base/page';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';

@Component({
  selector: 'nskr-login',
  imports: [MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends PageComponent {
  private auth = getAuth();
  private router = inject(Router);

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result: UserCredential) => {
        const { uid } = result.user;
        this.router.navigate(['tasks', uid]);
      })
      .catch((error: Error) => console.error('Login error:', error));
  }
}

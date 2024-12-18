import { Component, inject } from '@angular/core';
import { PageComponent } from '@core/base/page';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'nskr-login',
  imports: [MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends PageComponent {
  private auth = inject(Auth);
  private router = inject(Router);

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        const { uid } = result.user;
        console.log(result.user);
        this.router.navigate(['tasks', uid]);
      })
      .catch((error) => console.error('Login error:', error));
  }
}

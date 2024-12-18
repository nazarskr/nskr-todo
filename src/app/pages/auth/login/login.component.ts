import { Component, inject } from '@angular/core';
import { PageComponent } from '@core/base/page';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'nskr-login',
  imports: [MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends PageComponent {
  private auth = inject(Auth);

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => console.log('Logged in user:', result.user))
      .catch((error) => console.error('Login error:', error));
  }
}

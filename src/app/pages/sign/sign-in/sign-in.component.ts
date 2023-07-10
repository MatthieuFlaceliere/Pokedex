import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../sign.component.scss'],
})
export class SignInComponent {
  signInButtonText = 'Connexion';
  loading = 'false';
  error: string | null = null;

  constructor(public authenticationService: AuthenticationService) {}

  signInBtnClik(email: string, password: string) {
    this.signInButtonText = '';
    this.loading = 'true';
    this.authenticationService
      .signIn(email, password)
      .then(() => {
        this.signInButtonText = 'Connexion';
        this.loading = 'false';
      })
      .catch(error => {
        this.error = this.authenticationService.translateError(error.code);
        this.signInButtonText = 'Connexion';
        this.loading = 'false';
      });
  }

  signInDemo($event: MouseEvent) {
    $event.preventDefault();
    this.signInBtnClik('test@gmail.com', 'Test1234');
  }
}

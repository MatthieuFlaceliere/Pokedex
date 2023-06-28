import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../sign.component.scss'],
})
export class SignUpComponent {
  error: string | null = null;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  signUp(email: string, password: string) {
    this.authenticationService
      .signUp(email, password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.error = this.authenticationService.translateError(error);
      });
  }
}

import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../sign.component.scss']
})
export class SignInComponent {
  
  constructor(public authenticationService: AuthenticationService) {}
  
  signIn(email: string, password: string) {
    this.authenticationService.signIn(email, password);
  }
  
}

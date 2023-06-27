import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../sign.component.scss']
})
export class SignInComponent {

  signInButtonText = 'Sign In';
  loading = "false";

  constructor(public authenticationService: AuthenticationService) {}
  
  signInBtnClik(email: string, password: string) {
    this.signInButtonText = '';
    this.loading = "true";
    this.authenticationService.signIn(email, password);
  }


  
}

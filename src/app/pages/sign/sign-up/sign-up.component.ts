import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../sign.component.scss']
})
export class SignUpComponent {

  constructor(public authenticationService: AuthenticationService) {}

  async signUp(email: string, password: string) {
    const result = await this.authenticationService.signUp(email, password);
    console.log(result);
    console.log(typeof result);
  }

}

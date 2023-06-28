import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuActive = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {}

  isStartPages(): boolean {
    return this.router.url == '/sign-in' ||
      this.router.url == '/sign-up' ||
      this.router.url == '/'
      ? true
      : false;
  }

  signOutClick() {
    this.authService.signOut();
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
}

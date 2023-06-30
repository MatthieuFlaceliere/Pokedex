import { Component } from '@angular/core';
import { onAuthStateChanged } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuActive = false;
  logo = 'assets/img/logo-dark.png';
  darkMode = true;
  isAuth = false;

  constructor(public authService: AuthenticationService) {
    // Si le user est connecté, on affiche le bouton de déconnexion
    onAuthStateChanged(this.authService.auth, user => {
      console.log(user);
      user ? (this.isAuth = true) : (this.isAuth = false);
    });
  }

  signOutClick() {
    this.authService.signOut();
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  toogleDarkMode() {
    // Get the HTML DOM element
    const html = document.querySelector('html');

    if (this.darkMode === true) {
      html?.setAttribute('data-theme', 'light');
      this.logo = 'assets/img/logo-light.png';
      this.darkMode = false;
    } else {
      html?.setAttribute('data-theme', 'dark');
      this.logo = 'assets/img/logo-dark.png';
      this.darkMode = true;
    }
  }
}

import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public auth: Auth = inject(Auth);

  constructor(private router: Router) {}

  /**
   * Sign up with email/password to Firebase
   * @param email The user's email address
   * @param password The user's password
   * @returns Returns a UserCredential object or message error
   */
  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential: UserCredential) => {
        this.router.navigate(['/home']);
        return userCredential;
      })
      .catch(error => {
        throw error;
      });
  }
  /**
   * Sign in with email/password to Firebase
   * @param email The user's email address
   * @param password The user's password
   */
  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => {
        throw error;
      });
  }
  /**
   * Sign out from Firebase
   */
  signOut() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/accueil']);
    });
  }

  /**
   * Check if user is authenticated
   * @returns True if user is authenticated, false otherwise
   */
  isAuth() {
    // return this.currentUser;
  }

  /**
   * Translate error code to message
   * @param error The error
   * @returns The error message
   */
  translateError(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Utilisateur non trouvé.';
      case 'auth/wrong-password':
        return 'Mot de passe incorrect.';
      case 'auth/email-already-in-use':
        return "L'adresse email est déjà utilisée.";
      case 'auth/invalid-email':
        return "L'adresse email est invalide.";
      case 'auth/weak-password':
        return 'Le mot de passe doit contenir au moins 6 caractères.';
      case 'auth/too-many-requests':
        return 'Trop de tentatives de connexion. Veuillez réessayer plus tard.';
      default:
        return 'Une erreur est survenue.';
    }
  }
}

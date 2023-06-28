import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  item$: Observable<any[]>;
  firestore: Firestore = inject(Firestore);

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    const itemCollection = collection(this.firestore, 'users');
    this.item$ = collectionData(itemCollection);
  }

  /**
   * Sign up with email/password to Firebase
   * @param email The user's email address
   * @param password The user's password
   * @returns Returns a UserCredential object or message error
   */
  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        // Store the user's uid in the database
        // return true;
        this.router.navigate(['/home']);
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
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => {
        throw error;
      });
  }
  /**
   * Sign out from Firebase
   * @returns
   */
  signOut() {
    this.afAuth.signOut();
    this.router.navigate(['/accueil']);
  }

  /**
   * Get if authentified
   * @returns Observable boolean
   */
  isAuth(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(u => (u ? true : false)));
  }

  /**
   * Translate error code to message
   * @param error The error
   * @returns The error message
   */
  translateError(error: any): string {
    switch (error.code) {
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

import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getDoc, doc } from '@firebase/firestore';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public auth: Auth = inject(Auth);
  firestore: Firestore = inject(Firestore);

  private _user: User | null = null;

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
        const newUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          catchedPokemons: [],
        } as User;

        return setDoc(doc(this.firestore, 'users', email), newUser).then(() => {
          this.router.navigate(['/home']);
          this.user = newUser;
          return userCredential;
        });
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
        getDoc(doc(this.firestore, 'users', email)).then(doc => {
          if (doc.exists()) {
            const user = doc.data() as User;
            this.user = user;
            this.router.navigate(['/home']);
          } else {
            throw new Error('Utilisateur non trouvé.');
          }
        });
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
      localStorage.removeItem('user');
      this.router.navigate(['/accueil']);
    });
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

  /**
   * Set the user
   * @param user The user
   */
  private set user(user: User | null) {
    this._user = user;
    localStorage.setItem('user', btoa(JSON.stringify(user)));
  }

  /**
   * Get the user
   * @returns User | null
   * @memberof AuthenticationService
   * @returns User | null
   */
  public get user(): User | null {
    if (!this._user) {
      const user = localStorage.getItem('user');
      if (user) {
        this._user = JSON.parse(atob(user));
      }
    }
    return this._user;
  }

  /**
   * Update le user
   * @param user Le user
   */
  public updateUser(user: User) {
    setDoc(doc(this.firestore, 'users', user.email), user).then(() => {
      this.user = user;
    });
  }
}

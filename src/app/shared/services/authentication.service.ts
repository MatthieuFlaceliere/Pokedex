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
  signUp(email: string, password: string): Promise<boolean> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        // Store the user's uid in the database
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
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
        window.alert(error.message);
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
}

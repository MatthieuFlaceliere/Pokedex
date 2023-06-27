import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(public afAuth: AngularFireAuth) {}

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
        window.alert('You have been successfully registered!');
        return result;
      })
      .catch(error => {
        window.alert(error.message);
        return error;
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
      .then(result => {
        console.log(result);
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
    return this.afAuth
      .signOut()
      .then(() => {
        window.alert('You have been successfully logged out!');
      })
      .catch(error => {
        window.alert(error.message);
      });
  }
}

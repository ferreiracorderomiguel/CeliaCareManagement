import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable()
export class LoginService {
  constructor(private router: Router) {}
  token: string = '';

  login(email: string, password: string) {
    firebase.auth().signOut();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        firebase
          .auth()
          .currentUser?.getIdToken()
          .then((token: string) => {
            this.token = token;
            console.log('Usuario actual:', firebase.auth().currentUser?.email);
            this.router.navigate(['/home']);
          });
      });
  }

  getIdToken() {
    return this.token;
  }
}

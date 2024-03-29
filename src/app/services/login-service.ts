import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { NotifierService } from './notifier-service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LoginService {
  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private cookieService: CookieService
  ) {}
  token: string = '';

  /**
   * Logs in the user with the provided email and password.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   */
  login(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        firebase
          .auth()
          .currentUser?.getIdToken()
          .then((token: string) => {
            this.token = token;
            this.cookieService.set('token', this.token);
            this.router.navigate(['/home']);
            this.notifierService.showNotification(
              'Sesión iniciada correctamente',
              'Aceptar'
            );
          });
      });
  }

  /**
   * Retrieves the authentication token from the cookie.
   * @returns {string} - The authentication token.
   */
  getIdToken() {
    return this.cookieService.get('token');
  }

  /**
   * Logs out the user and clears the authentication token.
   */
  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.token = '';
        this.cookieService.set('token', this.token);
        this.notifierService.showNotification(
          'Sesión cerrada correctamente',
          'Aceptar'
        );
      });
  }
}

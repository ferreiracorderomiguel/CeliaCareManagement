import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

/**
 * Represents the NavbarComponent class.
 */
export class NavbarComponent {
  /**
   * Creates an instance of the NavbarComponent.
   * @param {LoginService} loginService - The login service used for authentication.
   */
  constructor(private loginService: LoginService) {}

  /**
   * Handles the logout functionality.
   * Calls the logout method of the login service to log out the user.
   */
  logout() {
    this.loginService.logout();
  }
}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

/**
 * Represents the LoginComponent class.
 */
export class LoginComponent {
  /**
   * Creates an instance of the LoginComponent.
   * @param {LoginService} loginService - The login service used for authentication.
   */
  constructor(private loginService: LoginService) {}

  /**
   * Handles the login form submission.
   * @param {NgForm} form - The NgForm object containing the form data.
   */
  login(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.loginService.login(email, password);
  }
}

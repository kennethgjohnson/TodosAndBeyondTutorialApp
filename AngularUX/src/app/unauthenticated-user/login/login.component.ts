import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { HardcodedAuthenticationService } from 'src/app/common/authentication/hardcoded-authentication.service';
import { UserNamePasswordCredential } from 'src/app/common/authentication/user-name-password-credential';
import { UserPrincipal } from 'src/app/common/authentication/user-principal';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/common/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: String = "";
  password: String = "";
  loginErrorMessage: String = "";
  isInvalidLogin: Boolean = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogin(): void {
    this.loginErrorMessage = "";
    this.validRequiredCredentials();
    this.performLogin();
  }

  validRequiredCredentials(): void {
    if ((this.username === "") && (this.password === "")) throw new Error("Username and password are required.");
    if (this.username === "") throw new Error("Username is required.");
    if (this.password === "") throw new Error("Password is required.");
  }

  displayErrorMessage(message: String): void {
    this.loginErrorMessage = message;
  }


  performLogin(): void {
    this.authenticationService.authenticate(new UserNamePasswordCredential(this.username, this.password)).subscribe(
      response => this.handleAuthenticateSuccess(response),
      response => this.handleAuthenticateError(response)
    );
  }

  handleAuthenticateSuccess(userPrincipal: UserPrincipal): void {
    console.log("Logged in successfully!");
    this.isInvalidLogin = false;
    this.router.navigate(["welcome", userPrincipal.getUserName()]);
  }

  handleAuthenticateError(response: HttpErrorResponse): void {
    let errorMessage: String = "";
    console.log("response.status:" + response.status);
    if (response.status === 401) {
      errorMessage = "Invalid credentials entered.";
    } else {
      errorMessage = response.message + (response.error ? (" " + response.error.error + ": " + response.error.message) : "");
    }

    this.displayErrorMessage(errorMessage);
    this.isInvalidLogin = true;
  }


}

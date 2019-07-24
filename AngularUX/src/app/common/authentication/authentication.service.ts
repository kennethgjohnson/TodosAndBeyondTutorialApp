import { Injectable } from '@angular/core';
import { UserNamePasswordCredential } from './user-name-password-credential';
import { Observable } from 'rxjs';
import { UserPrincipal } from './user-principal';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthenticationService {

  constructor() { }

  public abstract authenticate(credential: UserNamePasswordCredential): Observable<UserPrincipal>;

  public abstract isUserLoggedIn(): Boolean;

  public abstract logout(): void;

  public abstract getAuthenticatedUserPrincipal(): UserPrincipal;


}

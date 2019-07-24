import { Injectable } from '@angular/core';
import { UserPrincipal } from './user-principal';
import { UserNamePasswordCredential } from './user-name-password-credential';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSettings } from 'src/app/app.settings';
import { AuthenticationService } from './authentication.service';

const CURRENT_USER_PRINCIPAL_SESSION_KEY: string = "currentUserPrincipal";
@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService extends AuthenticationService {

  constructor(private http: HttpClient) { super(); }

  authenticate(credential: UserNamePasswordCredential): Observable<UserPrincipal> {
    let basicAuthHeaderString: string = this.createBasicAuthenticationHeaderValue(credential.username, credential.password);
    let headers: HttpHeaders = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });

    return this.http.get<UserPrincipal>(
      `${AppSettings.API_URL}/login/basicauth`,
      { headers }
    ).pipe(
      map(
        response => this.handleAuthenticationSuccess(response, basicAuthHeaderString)
      )
    );
  }

  handleAuthenticationSuccess(response: Object, authenticatedToken: string): UserPrincipal {
    let userPrincipal: UserPrincipal = Object.create(UserPrincipal.prototype);
    Object.assign(userPrincipal, response);

    userPrincipal.setAuthenticationToken(authenticatedToken);
    this.setAuthenticatedUserPrincipal(userPrincipal);
    return userPrincipal;
  }

  createBasicAuthenticationHeaderValue(username: String, password: String): string {
    let basicAuthHeaderString: string = "Basic " + window.btoa(`${username}:${password}`);
    return basicAuthHeaderString;
  }


  public isUserLoggedIn(): Boolean {
    return (this.getAuthenticatedUserPrincipal() != null);
  }

  public logout(): void {
    sessionStorage.removeItem(CURRENT_USER_PRINCIPAL_SESSION_KEY);
  }

  public getAuthenticatedUserPrincipal(): UserPrincipal {
    let json: string = sessionStorage.getItem(CURRENT_USER_PRINCIPAL_SESSION_KEY);
    if ((json == null) || (json === "")) return null;
    let jsonobject: object = JSON.parse(json);

    let principal: UserPrincipal = Object.create(UserPrincipal.prototype);
    Object.assign(principal, jsonobject);
    return principal;
  }

  setAuthenticatedUserPrincipal(principal: UserPrincipal): void {
    console.log(JSON.stringify(principal));
    sessionStorage.setItem(CURRENT_USER_PRINCIPAL_SESSION_KEY, JSON.stringify(principal));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WelcomeRequest } from './welcome-request';
import { WelcomeResponse } from './welcome-response';
import { UserPrincipal } from 'src/app/common/authentication/user-principal';
import { AuthenticationService } from 'src/app/common/authentication/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService ) { }

  public getObservable(welcomeRequest: WelcomeRequest): Observable<WelcomeResponse> {
    console.log("welcome service");
    let principal: UserPrincipal = this.authenticationService.getAuthenticatedUserPrincipal();
    let httpheaders: HttpHeaders = new HttpHeaders(this.createBasicAuthenticationHeader(principal.getAuthenticationToken()));
    return this.http.get<WelcomeResponse>(`http://localhost:8080/api/hello-world-bean/${welcomeRequest.name}`, {headers: httpheaders});
  }

  createBasicAuthenticationHeader(authenticationToken: String): any {
    return {
      Authorization: authenticationToken
    };
  }
}

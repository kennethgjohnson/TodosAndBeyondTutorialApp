import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserPrincipal } from './user-principal';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HTTPInterceptorBasicAuthService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, nextHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.authenticationService.isUserLoggedIn()) {
      return nextHandler.handle(request);
    }

    let principal: UserPrincipal = this.authenticationService.getAuthenticatedUserPrincipal();
    let authorizationHeaderValue: string = "" + principal.getAuthenticationToken();
    let modifiedRequest: HttpRequest<any> = request.clone({
      setHeaders: {
        Authorization: authorizationHeaderValue
      }
    });
    return nextHandler.handle(modifiedRequest);
  }
}

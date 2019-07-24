import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserPrincipal } from './user-principal';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private router: Router,
    private authenticator: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authenticator.isUserLoggedIn()) {
      this.router.navigate(["login"]);
      return false;
    }
    if (route.routeConfig.data == null) return true;

    let requiredPrincipal: String = route.routeConfig.data.requiredPrincipal;

    if (requiredPrincipal != null) {
      let principal: UserPrincipal = this.authenticator.getAuthenticatedUserPrincipal();
      if (!principal.hasResource(requiredPrincipal)) {
        this.router.navigate(["login"]);
        return false;
      }
    }
    return true;
  }
}

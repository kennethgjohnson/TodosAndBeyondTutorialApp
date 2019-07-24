import { Component, OnInit } from '@angular/core';
import { Resources } from '../../authentication/resources';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  isWelcomeEnabled(): Boolean {
    if (!this.authenticationService.isUserLoggedIn()) return false;
    if (!this.authenticationService.getAuthenticatedUserPrincipal().
      hasResource(Resources.WELCOME_RESOURCE)) return false;
    return true;
  }

  isTodoEnabled(): Boolean {
    if (!this.authenticationService.isUserLoggedIn()) return false;
    if (!this.authenticationService.getAuthenticatedUserPrincipal().
      hasResource(Resources.TODOS_RESOURCE)) return false;
    return true;
  }

  isLoginEnabled(): Boolean {
    return !this.authenticationService.isUserLoggedIn();
  }

  isLogoutEnabled(): Boolean {
    return this.authenticationService.isUserLoggedIn();
  }
  getWelcomeURL(): String {
    return "/welcome/" + this.authenticationService.getAuthenticatedUserPrincipal().
      getUserName();
  }
}

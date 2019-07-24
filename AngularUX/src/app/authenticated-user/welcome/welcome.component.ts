import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WelcomeService } from './welcome.service';
import { WelcomeRequest } from './welcome-request';
import { Observable, Subscription } from 'rxjs';
import { WelcomeResponse } from './welcome-response';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  username: String = "";
  constructor(private route: ActivatedRoute,
    private service: WelcomeService,
    private router: Router) { }
  message: String = "Weeee!";
  welcomeMessage: String = "";
  errorMessage: String = "";
  ngOnInit(): void {
    console.log(this.message);
    this.username = this.route.snapshot.params['name'];
  }

  loadWelcomeMessage(): void {
    console.log("welcome button");

    this.service.getObservable(new WelcomeRequest(this.username))
      .subscribe(
        welcomeResponse => this.handleWelcomeResponseSuccess(welcomeResponse),
        welcomeErrorResponse => this.handleWelcomeResponseError(welcomeErrorResponse)
      );
  }

  handleWelcomeResponseSuccess(response: WelcomeResponse): void {
    console.log("handleWelcomeResponse:" + response.message);
    this.welcomeMessage = response.message;
    this.errorMessage = "";
  }

  handleWelcomeResponseError(response: HttpErrorResponse): void {
    this.errorMessage = response.message + (response.error ? (" " + response.error.error + ": " + response.error.message) : "");
    this.router.navigate([`/error/${encodeURIComponent(<string>this.errorMessage)}`]);
  }
}

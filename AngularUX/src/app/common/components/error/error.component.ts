import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  public errorMessage: String = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    if ((this.route.snapshot.params['error'] == null) || (this.route.snapshot.params['error'] === "")) {
      this.errorMessage = "An error occured! Please contact support on XXX-XXX-XXXX";
    } else {
      this.errorMessage = decodeURIComponent(this.route.snapshot.params['error']);
    }
  }

}

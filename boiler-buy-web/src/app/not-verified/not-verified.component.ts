import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-not-verified',
  templateUrl: './not-verified.component.html',
  styleUrls: ['./not-verified.component.scss']
})
export class NotVerifiedComponent implements OnInit {

  private appcomp: AppComponent = new AppComponent();
  email: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.email = this.appcomp.getEmail();
  }


  sendNewEmail(): void {
    console.log("Sending new verification email");
    let request = this.http.patch(
      `api/accounts/${this.email}/sendVerificationEmail/`,
      {observe: 'response'},
      );

    request.subscribe((response: any) => {
      console.log("Request sent");
    });
  }
}

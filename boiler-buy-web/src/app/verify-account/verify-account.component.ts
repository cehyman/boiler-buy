import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  successful: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // Path should be verify/account/{email}
    let email = this.activatedRoute.snapshot.url.toString().split(',')[2];
    console.log(`email: ${email}`);

    let request = this.http.patch(
      `api/accounts/${email}/verify/`,
      {observe: 'response'}
    );

    console.log()
    request.subscribe((response: any) => {
      this.successful = (response.success == true)
    });
  }

}

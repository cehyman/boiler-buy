import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  successful: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let email = "vtest1@purdue.edu"

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

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  accountEmail:String = "";

  reset() {
    // check if email exists 

    // email sent!

    // redirect to special-reset-password

    let request = this.http.get(
      `api/accounts/${this.accountEmail}/sendResetPassword/`,
      {observe: 'response'}
    );
    request.subscribe((response: any) => {
      console.log(response)
    });
  }

}

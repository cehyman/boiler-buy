import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {
  successful: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    // Get the email to verify from the path. 
    let email = this.activatedRoute.snapshot.url.toString().split(',')[1];
    console.log(`email: ${email}`);

    // Send a request to the backend to verify the email
    let request = this.http.patch(
      `api/accounts/${email}/verify/`,
      {observe: 'response'}
    );
    request.subscribe((response: any) => {
      this.successful = (response.success == true)
    });

    // After 5 seconds, redirect the user to their profile page
    setTimeout(() =>{
      this.router.navigate(['/profile']);
    }, 5000);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class VerifiedGuard implements CanActivate {
  private appcomp: AppComponent = new AppComponent();
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    
  }

  isVerified(){
    let email = this.appcomp.getEmail();
    
    let request = this.http.get(
      `api/accounts/${email}/verified/`,
      {observe: 'body'}
    );

    // This pipe/map operation converts the request into a boolean for the
    // actual subscription event. This is what allows the request to be treated
    // synchronously.
    return request.pipe(
      map((data: any) => {
        if(data.verified == true) {
          console.log("User verified. Continuing...");
          return true;
        }
        else {
          console.log("User not verified. Redirecting to unverified page");
          this.router.navigate(['not-verified']);
          return false;
        }
      })
    );
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       
    return this.isVerified();
  }
}

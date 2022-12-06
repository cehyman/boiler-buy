import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
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
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let email = this.appcomp.getEmail();
    
    let request = this.http.get(
      `api/accounts/${email}/verified`,
      {observe: 'response'}
    );
    
    let verified: boolean = false;
    request.subscribe((response: any) => {
      verified = response.verified
      }
    );
    
    if(verified) {
      console.log("User verified. Continuing...");
      return true;
    }
    else {
      console.log("User not verified. Redirecting to unverified page");
      this.router.navigate(['not-verified']);
      return false;
    }
  }
  
}

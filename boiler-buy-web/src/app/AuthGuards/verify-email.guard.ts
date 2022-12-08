import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class VerifyEmailGuard implements CanActivate {
  private appcomp: AppComponent = new AppComponent();
  
  constructor(
    private router: Router
  ) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Get the email that is logged in and the mail that is in the URL
    let appEmail = this.appcomp.getEmail();
    let urlEmail = route.url.toString().split(',')[1];

    // If the email that is in the url is different from the one logged in,
    // redirect to the verification page since we don't users verifying
    // eachother by modifying the links
    if(appEmail != urlEmail) {
      this.router.navigate(['not-verified']);
    }
    return appEmail == urlEmail
  }
  
}

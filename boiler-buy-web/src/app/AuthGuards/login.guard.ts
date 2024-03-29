import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  private appcomp: AppComponent = new AppComponent();
  
  constructor( private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.appcomp.getUsername() == null) { 
      console.log("User not logged in. Redirecting to main page");
      
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    else {
      console.log(`User logged in: ${this.appcomp.getUsername()}. Continuing to page`)
      return true;
    }
  }
  
}

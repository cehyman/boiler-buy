import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-site-menu',
  templateUrl: './site-menu.component.html',
  styleUrls: ['./site-menu.component.css']
})
export class SiteMenuComponent implements OnInit {
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;

  constructor(private router: Router, private http: HttpClient, private darkModeService: DarkModeService) {}
  private appComp: AppComponent = new AppComponent();
  @Output() public sidenavToggle = new EventEmitter();

  currUser:string = ''
  currPass:string = ''
  currEmail:string = ''
  wishlistLink:string = ''
  wishlistID:number = 0
  shopID:number = 0


  ngOnInit(): void {
    if (this.appComp.getUsername()) {
      this.currUser = <string> this.appComp.getUsername()
    } else {
      this.currUser = "Username"
    }

    this.currPass = <string> this.appComp.getPassword()
    this.currEmail = <string> this.appComp.getEmail()
    
  }
  
  onToggle(): void {
    this.darkModeService.toggle();
  }


  logoutAccount() {
    //removing information from sessionStorage
    this.darkModeService.disable()

    this.appComp.removeAllSessionStorage()

    this.router.navigate(['/login'])
  }

  routeUserWishlist() {
    this.wishlistID = <number> <unknown> this.appComp.getWishlistID();
    console.log("wishlist id: " + this.wishlistID)
    this.router.navigate(['/wishlist/' + this.wishlistID])
  }

  routePurchaseHistory() {
    this.router.navigate(['/profile/purchase-history'])
  }

  routeUserShop() {
    this.shopID = <number><unknown> this.appComp.getShopID()
    console.log("shop id: " + this.shopID)
    this.router.navigate(['/shop/' + this.shopID])
  }

}


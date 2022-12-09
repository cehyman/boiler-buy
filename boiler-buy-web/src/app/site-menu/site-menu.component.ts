import { Component, EventEmitter, OnInit, Output, Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, } from '@angular/forms';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-site-menu',
  templateUrl: './site-menu.component.html',
  styleUrls: ['./site-menu.component.scss']
})
export class SiteMenuComponent implements OnInit {

  constructor(private router: Router, private renderer: Renderer2) {}
  private appComp: AppComponent = new AppComponent();
  @Output() public sidenavToggle = new EventEmitter();

  toggleTheme = new FormControl(false);

  currUser:string = ''
  currPass:string = ''
  currEmail:string = ''
  wishlistLink:string = ''
  wishlistID:number = 0
  shopID:number = 0

  ngOnInit() {
    if (this.appComp.getUsername()) {
      this.currUser = <string> this.appComp.getUsername()
    } else {
      this.currUser = "Username"
    }

    this.currPass = <string> this.appComp.getPassword()
    this.currEmail = <string> this.appComp.getEmail()

    this.toggleTheme.valueChanges.subscribe(toggleValue => {
      if (toggleValue === true) {
       this.renderer.addClass(document.body, 'dark-theme');
       this.renderer.removeClass(document.body, 'light-theme');
      } else {
       this.renderer.addClass(document.body, 'light-theme');
       this.renderer.removeClass(document.body, 'dark-theme');
      }
     });
  }

  logoutAccount() {
    this.toggleTheme.valueChanges.subscribe(toggleValue => {
      if (toggleValue === true) {
       this.renderer.addClass(document.body, 'light-theme');
       this.renderer.removeClass(document.body, 'dark-theme');
      }
     });

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


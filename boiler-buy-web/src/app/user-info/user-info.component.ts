import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AppComponent } from '../app.component';

//global variables
import { Globals } from '../globals';
import { DeleteAccountService } from '../delete-account.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  status: string = '';
  errorMessage: string = '';

  /* Currently not using globals */
  public globals: Globals = new Globals();

  /* To save to session. All session functions are in AppComponent. */
  private appcomp: AppComponent = new AppComponent();
  private deleteAccService: DeleteAccountService = new DeleteAccountService(
    this.http
  );

  curruser: string = '';
  currpass: string = '';
  curremail: string = '';
  imageURL!: URL;
  show: boolean = false;

  reviewDescription: string = '';
  reviewCount: number = 0;
  reviewAvg: number = 0;
  reviews: string[] = [];

  wishlist_id: number = 0;
  products: any = [];

  shop_id: number = 0;

  venmo_tag: string = ""

  constructor(private router: Router, private http: HttpClient, public dialog: MatDialog) {}
  
  /* On start up gets the users information from the sessionStorage and */
  /* displays on /profile page                                          */
  ngOnInit(): void {
    //console.log("Starting value of gloabl username is %s", this.globals.username)
    //console.log("But value of saved username in session saver is $s",this.appcomp.getUsername())
    this.globals.username = <string>this.appcomp.getUsername();

    if (this.appcomp.getUsername()) {
      this.curruser = <string>this.appcomp.getUsername();
    } else {
      this.curruser = 'Username';
    }

    this.currpass = <string>this.appcomp.getPassword();
    this.curremail = <string>this.appcomp.getEmail();

    this.displayProfilePic();

    this.getUserWishlist();

    this.getUserShopID();

    var accountURL = 'api/accounts/' + this.appcomp.getEmail() + '/';
    var request = this.http.get(accountURL, { observe: 'response' });
    request.subscribe((data: any) => {
      console.log(data)
      this.reviewCount = data["body"]["sellerRatingCount"]
      this.reviewAvg = data["body"]["sellerRating"]
      this.reviews = data["body"]["sellerReviews"]
      this.curremail = data["body"]["email"]
      this.curruser = data["body"]["username"]  
    })
   
    //get current venmo tag
    var requestVenmo = this.http.get('api/accounts/' + this.appcomp.getEmail()+"/")
    requestVenmo.subscribe((data: any) => {
      console.log('request venmo:', data)
      this.venmo_tag = data.venmoTag;
    })
  }

  password() {
    this.show = !this.show;
  }

  deleteAccount(email: string) {
    //TODO: deletes account should create and use a service file for request
    console.log('Linked correctly');
    this.deleteAccService.deleteUser(this.curremail).subscribe({
      next: (data) => {
        this.status = 'Delete successful';
      },
      error: (error) => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      },
    });

    //removing information from sessionStorage
    this.appcomp.removeAllSessionStorage();

    alert('Deleted User. Returning Back to Register');
    this.router.navigate(['/register']);
  }

  logoutAccount() {
    //removing information from sessionStorage
    this.appcomp.removeAllSessionStorage();

    //route back to /register
    this.router.navigate(['/login']);
  }

  getUserWishlist() {
    var request = this.http.get<any>(
      'api/accounts/'.concat(this.curremail).concat('/')
    );
    console.log(this.curremail);
    request.subscribe((data) => {
      let wishlistLink = data['wishlist'];
      let urlSp = wishlistLink.split('/');
      this.wishlist_id = Number(urlSp[urlSp.length - 2]);
      console.log('id: ' + this.wishlist_id);

      //get the user's wishlist product array
      var request = this.http.get<any>('api/wishlist/' + this.wishlist_id, {
        observe: 'body',
      });
      request.subscribe((data) => {
        console.log(data);
        this.products = data.products;

        this.appcomp.saveWishlistID(String(this.wishlist_id));
        this.appcomp.saveWishlistProductArray(this.products);
      });
    });
  }

  getUserShopID() {
    var request = this.http.get<any>(
      'api/accounts/'.concat(this.curremail).concat('/')
    );
    console.log(this.curremail);
    request.subscribe((data) => {
      console.log(data);
      let shopLink = data['shop'];

      let shopUrl = shopLink.split('/');

      this.shop_id = Number(shopUrl[shopUrl.length - 2]);
      console.log('shopid: ' + this.shop_id);

      this.appcomp.saveShopID(String(this.shop_id));
    });
  }

  displayProfilePic() {
    var request = this.http.get<any>(`api/accounts/${this.curremail}/`, {
      observe: 'body',
    });

    request.subscribe((data) => {
      console.log(data);

      let image = data['image'];
      if (image == null) {
        this.imageURL = new URL(
          'https://api-private.atlassian.com/users/1a39e945ae51e44675e6c70f682173c4/avatar'
        );
      } else {
        //display the image in database
        var req2 = this.http.get<any>(
          `api/accounts/${this.curremail}/retrieveImages`,
          { observe: 'body' }
        );
        req2.subscribe((data: any) => {
          this.imageURL = data;
        });
      }
    });
  }

  editVenmoTag() {
    //dialog:
    console.log(this.venmo_tag)
    const dialogRef = this.dialog.open(VenmoTagDialog, {
      data: {"venmo_tag": this.venmo_tag},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result ', result);

      var body = {
        venmoTag: result
      };
      var accountURL = "api/accounts/".concat(this.curremail).concat("/");
      var patchRequest = this.http.patch<any>(accountURL, body, {observe: 'response'});
  
      patchRequest.subscribe((data: any) => {
        console.log(data)
      })
    });

  }
}

export interface DialogData {
  venmo_tag: string;
}

@Component({
  selector: 'venmo-tag-dialog',
  templateUrl: 'venmo-tag-dialog.html',
})
export class VenmoTagDialog implements OnInit {

  vt:string = ""

  constructor(
    public dialogRef: MatDialogRef<VenmoTagDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.vt = data.venmo_tag
    console.log(data.venmo_tag)
  }

  ngOnInit(): void {
    // this.vt = data.venmo_tag
    // console.log(this.vt)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
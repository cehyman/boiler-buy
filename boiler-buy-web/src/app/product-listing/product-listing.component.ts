import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { Globals } from '../globals';
import { Product } from '../product-types';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css'],
})
export class ProductListingComponent implements OnInit {
  @Input() object: Product = {id: 0, name: "", priceDollars: 0, sellerRating: 0, sellerRatingCount: 0} as Product;

  public globals: Globals = new Globals;
  private appcomp: AppComponent = new AppComponent();

  halfStar: boolean = false;
  fullStars: Array<boolean>;
  emptyStars: Array<boolean>;
  curruser:string = ''

  constructor(public dialog: MatDialog) {
    this.fullStars = new Array();
    this.emptyStars = new Array();
  }

  ngOnInit(): void {
    let starsLeft = 5;
    for(let i = 0; i < Math.floor(this.object.sellerRating); i++) {
      this.fullStars.push(true);
      starsLeft--;
    }
    // console.log('stars left after full stars: ', starsLeft)
    let diff = this.object.sellerRating - Math.floor(this.object.sellerRating);
    if (diff >= 0.5) {
      this.halfStar = true;
      starsLeft--;
    }
    // console.log('stars left after checking half star: ', starsLeft)
    
    for(let i = 0; i < starsLeft; i++) {
      this.emptyStars.push(true);
    }

    this.globals.username = <string> this.appcomp.getUsername()

    if (this.appcomp.getUsername()) {
      this.curruser = <string> this.appcomp.getUsername()
    } else {
      this.curruser = "Username"
    }
    console.log("current username:",this.curruser)
  }

  openDialog(): void {
    if (this.curruser != 'Username') {
      const dialogRef = this.dialog.open(PurchaseConfirmationDialog, {
        width: '250px',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.purchase();
        }
      });
    }
  }

  purchase(): void {
    console.log('buying', this.object.name);
    //need to add item to user's purchases

    //need to decrease count for product in database and make it invisible
  }

}

@Component({
  selector: 'purchase-confirmation-dialog',
  templateUrl: 'purchase-confirmation-dialog.html',
})
export class PurchaseConfirmationDialog {
  constructor(public dialogRef: MatDialogRef<PurchaseConfirmationDialog>) {}
}
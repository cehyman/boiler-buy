import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { ConfirmDeleteDialog } from '../edit-product/edit-product.component';
import { GroupAdList, GroupAdObj, Product } from '../product-types';

@Component({
  selector: 'app-user-shop',
  templateUrl: './user-shop.component.html',
  styleUrls: ['./user-shop.component.css']
})
export class UserShopComponent implements OnInit {

  private appcomp: AppComponent = new AppComponent();

  shop_id:number = 0
  products: any = []
  productList: Product[] = []
  groupAds: GroupAdObj[] = []
  curruser:string = ''
  curremail:string = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    ) {
  }

  ngOnInit(): void {
    this.curruser = <string> this.appcomp.getUsername()
    this.curremail = <string> this.appcomp.getEmail()

    var urlStr = this.activatedRoute.snapshot.url.toString();
    console.log('urlStr: ', urlStr);
    this.shop_id = Number(urlStr.split(',')[1]);

    if(isNaN(this.shop_id)) {
      alert(`Invalid URL "${urlStr}": "${this.shop_id}"`);
      return;
    }

    this.getGroupAds()

    console.log(this.shop_id)

    //create a get request to get all products on a wishlist
    var request = this.http.get<any>('api/shops/' + this.shop_id, {observe: "body"})

    request.subscribe(data => {
      console.log(data)

      this.products = data.products

      let i = 0
      for (i = 0; i < this.products.length; i++) {
        console.log("product id: " + this.products[i])

        //create a product type and add to productList in order to display on screen
        var req2 = this.http.get('api/products/' + this.products[i], {responseType: 'json'}) as Observable<Product>
        req2.subscribe((data:any) => {
          console.log(data)
          this.productList.push(data)
        })
      }
    })
  }

  getGroupAds() {
    var request = this.http.get('api/groupAds/', {responseType: 'json'}) as Observable<GroupAdList>

    request.subscribe((data:any) => {
      console.log(data)
      this.groupAds = data

      this.groupAds = this.groupAds.filter(ad => ad.email === this.curremail)
    })
  }

  confirmDelete(productId: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '75wh',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result', result);
      if (result != undefined && result) {
        this.deleteAd(productId);
      }
    });
  }

  deleteAd(productId: number) {
    console.log('placeholder for deleting the ad');
    //send delete request
    this.http.delete(`/api/products/${productId}/`).subscribe((response) => {
      alert('Product deleted successfully.');
      //refresh this page
      document.location.reload();
    }, (error) => {
      console.log(error);
      alert('There was an error. Refresh and try again.');
    });
  }

  routeCreateGroupAd() {
    this.router.navigate(['/create-group-ad'])
  }

}
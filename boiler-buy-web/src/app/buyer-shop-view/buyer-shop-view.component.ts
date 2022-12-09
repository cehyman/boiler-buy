import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { GroupAdList, GroupAdObj, Product } from '../product-types';

@Component({
  selector: 'app-buyer-shop-view',
  templateUrl: './buyer-shop-view.component.html',
  styleUrls: ['./buyer-shop-view.component.scss']
})
export class BuyerShopViewComponent implements OnInit {
  private appcomp: AppComponent = new AppComponent();

  products: Product[] = [];
  productList: Product[] = []
  featuredList: number[] = [];

  background: File | null = null;
  description: string = "";
  shop_id: number = 0;
  
  groupAds: GroupAdObj[] = [];
  curruser:string = '';
  curremail:string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) { }

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

    //create a get request to get all products on a wishlist
    var request = this.http.get<any>('api/shops/' + this.shop_id, {observe: "body"})
    
    request.subscribe(data => {
      console.log(data)

      this.products = data.products;
      this.background = data.image;
      console.log(`image = ${this.background}`)

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
    this.getFeaturedProducts();
    this.fetchCustomization();
  }

  getGroupAds() {
    var request = this.http.get('api/groupAds/', {responseType: 'json'}) as Observable<GroupAdList>

    request.subscribe((data:any) => {
      console.log(data)
      this.groupAds = data

      this.groupAds = this.groupAds.filter(ad => ad.email === this.curremail)
    })
  }
  getFeaturedProducts() {
    let request = this.http.get(
      `/api/shops/${this.shop_id}/featuredProducts/`,
      {observe: "body"}
    ).subscribe((data: any) => {
      this.featuredList = data.featuredProducts;
      console.log(`Featured list: ${this.featuredList}`);
    });
  }

  fetchCustomization() {
    // Fetch the shop id using the user's account.
    this.curremail = <string> this.appcomp.getEmail()
    let request = this.http.get(`/api/accounts/${this.curremail}/`, {observe: "body"});
    request.subscribe((result: any) => {
      
      // Now that we know the id of the shop, we can request the description of the 
      // shop
      let subRequest = this.http.get(`/api/shops/${this.shop_id}`, {observe: "body"});
      subRequest.subscribe((result: any) => {
        this.description = result.description;
        this.background = result.image;
      });
    }); 
  }
}

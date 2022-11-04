import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Product } from '../product-types';

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
  curruser:string = ''

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.curruser = <string> this.appcomp.getUsername()

    var urlStr = this.activatedRoute.snapshot.url.toString();
    this.shop_id = Number(urlStr.split(',')[1]);

    if(isNaN(this.shop_id)) {
      alert(`Invalid URL "${urlStr}": "${this.shop_id}"`);
      return;
    }

    console.log(this.shop_id)

    //create a get request to get all products on a wishlist
    var request = this.http.get<any>('http://localhost:8000/api/shops/' + this.shop_id, {observe: "body"})

    request.subscribe(data => {
      console.log(data)

      this.products = data.products

      let i = 0
      for (i = 0; i < this.products.length; i++) {
        console.log("product id: " + this.products[i])

        //create a product type and add to productList in order to display on screen
        var req2 = this.http.get('http://localhost:8000/api/products/' + this.products[i], {responseType: 'json'}) as Observable<Product>
        req2.subscribe((data:any) => {
          console.log(data)
          this.productList.push(data)
        })
      }
    })
  }

}

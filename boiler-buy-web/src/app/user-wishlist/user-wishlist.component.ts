import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Product, ProductList } from '../product-types';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.css']
})
export class UserWishlistComponent implements OnInit {
  
  private appcomp: AppComponent = new AppComponent();

  wishlist_id:number = 0
  products: any = []
  productList: Product[] = []
  curruser:string = ''

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {

    this.curruser = <string> this.appcomp.getUsername()

    var urlStr = this.activatedRoute.snapshot.url.toString();
    this.wishlist_id = Number(urlStr.split(',')[1]);

    if(isNaN(this.wishlist_id)) {
      alert(`Invalid URL "${urlStr}": "${this.wishlist_id}"`);
      return;
    }

    console.log(this.wishlist_id)

    //create a get request to get all products on a wishlist
    var request = this.http.get<any>('http://localhost:8000/api/wishlist/' + this.wishlist_id, {observe: "body"})

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

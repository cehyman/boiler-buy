import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../product-types';

@Component({
  selector: 'app-groupad-details',
  templateUrl: './groupad-details.component.html',
  styleUrls: ['./groupad-details.component.scss']
})
export class GroupadDetailsComponent implements OnInit {

  name: string = '';
  groupad_id: number = 0;

  products: any = []
  productList: Product[] = []

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router){ }

  ngOnInit(): void {
    var urlStr = this.activatedRoute.snapshot.url.toString();
    this.groupad_id = Number(urlStr.split(',')[1]);
    if(isNaN(this.groupad_id)) {
      alert(`Invalid URL "${urlStr}": "${this.groupad_id}"`);
      return;
    }

    console.log(this.groupad_id)

    //get the product array in the group-ad

    this.getProductList()

  }

  getProductList() {
    var request = this.http.get('api/groupAds/' + this.groupad_id, {observe: "body"})

    request.subscribe((data:any) => {
      //console.log(data)

      this.name = data.name
      this.products = data.products
      //console.log(this.product_ids)

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

}

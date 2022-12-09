import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Product, ProductList, RecentlyViewedItem } from '../product-types';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-recently-viewed-items',
  templateUrl: './recently-viewed-items.component.html',
  styleUrls: ['./recently-viewed-items.component.scss']
})
export class RecentlyViewedItemsComponent implements OnInit {
  items: Array<RecentlyViewedItem>;

  constructor(private http: HttpClient, private appcomp: AppComponent, public router:Router, private productService: ProductService) {
    this.items = new Array<RecentlyViewedItem>;
  }

  ngOnInit(): void {
    var request = this.http.get('api/viewHistory');

    request.subscribe((data:any) => {
      console.log(data);

      this.items = data;
      //TODO: later: do the filtering in the backend. don't want users to be able to access everyone elses' info
      this.items = this.items.filter(element => element.email == this.appcomp.getEmail());
      
      this.items.forEach(element => {
        element.lastViewed = new Date(element.lastViewed)
      });


      this.items.sort((a, b) => b.lastViewed.getTime() - a.lastViewed.getTime())
    });
  }

  viewDetails(productID: number) {
    // console.log("redirect")
    this.productService.addProductToViewHistory(productID).subscribe(() => {
      console.log("added "+ productID + " to view history");
      this.router.navigate(['/products/' + productID])
    })
    
  }

}

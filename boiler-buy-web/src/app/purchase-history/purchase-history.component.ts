import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Product, ProductList, PurchaseInfo } from '../product-types';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  purchases: Array<PurchaseInfo>;

  constructor(private http: HttpClient, private appcomp:AppComponent) {
    this.purchases = new Array<PurchaseInfo>;
  }

  ngOnInit(): void {
    //request for a users purchase history
    var request = this.http.get('http://127.0.0.1:8000/api/purchaseHistory');

    request.subscribe((data:any) => {
      console.log(data);

      this.purchases = data;
      //TODO: later: do the filtering in the backend. don't want users to be able to access everyone elses' info
      this.purchases = this.purchases.filter(element => element.buyerEmail == this.appcomp.getEmail());
      
      this.purchases.forEach(element => {
        element.purchaseTime = new Date(element.purchaseTime)
        console.log(element.purchaseTime);
        console.log(element.purchaseTime.getTime())
      });

      this.purchases.sort((a, b) => b.purchaseTime.getTime() - a.purchaseTime.getTime())
    });
    
    
  }

  viewDetails() {

  }

}

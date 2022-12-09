import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { of } from 'rxjs';
import { AppComponent } from '../app.component';
import { Globals } from '../globals';

@Component({
  selector: 'app-shop-history-view',
  templateUrl: './shop-history-view.component.html',
  styleUrls: ['./shop-history-view.component.css']
})
export class ShopHistoryViewComponent implements OnInit {
  items: any[] = [];

  columnsToDisplay = ['date', 'description'];

  public globals: Globals = new Globals;

  private appcomp: AppComponent = new AppComponent();

  curruser:string = ''
  currpass:string = ''
  curremail:string = ''

  id: number = 0;


  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    
    console.log("Starting value of gloabl username is %s", this.globals.username)
    console.log("But value of saved username in session saver is $s",this.appcomp.getUsername())
    this.globals.username = <string> this.appcomp.getUsername()
    
    if (this.appcomp.getUsername()) {
      this.curruser = <string> this.appcomp.getUsername()
    } else {
      this.curruser = "Username"
    }

    this.currpass = <string> this.appcomp.getPassword()
    this.curremail = <string> this.appcomp.getEmail()
    
    let request = this.http.get(`/api/accounts/${this.curremail}/`, {observe: "body"});
    request.subscribe((result: any) => {
      console.log(`shop = ${result.shop}`);

      let shopId = result.shop.split('/')[5];
      console.log(`${shopId}`);

       this.http.get(`/api/shops/${shopId}/history/`, {observe: 'body'})
      .subscribe((response: any) =>{
        console.log(response);
        for (let i = response.length - 1; i > 0; i--) {
          this.items.push(response[i]);
        }
      });
    });
  }

  
  dateTimeString(dateTime: string) {
    let date = new Date(dateTime);
    
    let dateStr = date.toLocaleDateString();
    let timeStr = date.toLocaleTimeString();

    return `${dateStr} at ${timeStr}`;
  }

  itemDescription(item: any) {
    switch(item.action) {
      case "create":
        return this.createDescription(item);
      case "edit":
        return this.editDescription(item);
      case "delete":
        return this.deleteDescription(item);
      case "sold":
        return this.soldDescription(item);
      default: 
        return `
        We're not sure what went wrong, but you have taken an unexpected
        action with your store. Stop breaking our website!
        `;
    }
  }

  createDescription(item: any) {
    return `You created an ad for ${this.getProductHtml(item)}.`;
  }

  editDescription(item: any) {
    return `You edited your ad for ${this.getProductHtml(item)}.`;
  }

  deleteDescription(item: any) {
    return `You deleted your ad for ${item.productName}`;
  }

  soldDescription(item: any) {
    return `You sold ? of ${this.getProductHtml(item)}. Meeting at ${this.getLocationHtml(item)}. You made ${this.getProfitHtml(item)}!`;
  }

  getProductHtml(item: any) {
    if(item.productId == null){
      return `"item.productName"`;
    }
    else {
      return `"
      <a href="/products/${item.productId}">
        ${item.productName}
      </a>"`
    }
  }

  getProfitHtml(item: any) {
    return `\$${item.profit}`;
  }

  getLocationHtml(item: any) {
    if(item.locations == null){
      return `not found`;
    }
    else {
      return `${item.locations}`;
    } 
  }
}

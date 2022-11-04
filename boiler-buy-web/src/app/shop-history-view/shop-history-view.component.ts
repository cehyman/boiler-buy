import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-shop-history-view',
  templateUrl: './shop-history-view.component.html',
  styleUrls: ['./shop-history-view.component.css']
})
export class ShopHistoryViewComponent implements OnInit {
  id: number = 0;
  items: any[] = [];

  columnsToDisplay = ['date', 'description'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    // It was this easy to do. It was worse for the edit screen ;_;
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id']
    });
    console.log(`this.id = ${this.id}`);

    this.http.get(`/api/shops/${this.id}/history`, {observe: 'body'})
    .subscribe((response: any) =>{
      console.log(response);
      
      for (let i = response.length - 1; i > 0; i--) {
        this.items.push(response[i]);
      }
    })
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
        action with your store. Stop breaking out website!
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
    return `You sold ? of ${this.getProductHtml(item)}. You made ${this.getProfitHtml(item)}!`;
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
}

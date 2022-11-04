import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-history-item',
  templateUrl: './shop-history-item.component.html',
  styleUrls: ['./shop-history-item.component.css']
})
export class ShopHistoryItemComponent implements OnInit {
  @Input() item: any;

  constructor() { }

  ngOnInit(): void {
  }

  dateTimeString() {
    let date = new Date(this.item.dateTime);
    
    let dateStr = date.toLocaleDateString();
    let timeStr = date.toLocaleTimeString();

    return `${dateStr} at ${timeStr}`;
  }

}

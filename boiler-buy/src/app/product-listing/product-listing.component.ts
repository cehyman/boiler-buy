import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  @Input() object: product = {title: "", price: 0};

  constructor() { }

  ngOnInit(): void {
  }

}

type product = {
  title: String,
  price: number,
}
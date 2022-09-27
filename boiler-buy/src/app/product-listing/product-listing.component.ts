import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product-types';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  @Input() object: Product = {name: "", priceDollars: 0} as Product;

  constructor() { }

  ngOnInit(): void {
  }

}

type product = {
  title: String,
  price: number,
}
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit {

  // The various entires the user fills in to create the listing.
  // TODO: Create a way for users to upload images. (This may be hard)
  listingTitle: string = '';
  listingPrice: string = '';
  listingDescription: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  // This should eventually get changed to interact with the database
  submit(): void {
    console.log("Submit:");
    console.log(`listingTitle: ${this.listingTitle}`)
    console.log(`listingPrice: ${this.listingPrice}`)
    console.log(`listingDesc: ${this.listingDescription}`)
  }

}

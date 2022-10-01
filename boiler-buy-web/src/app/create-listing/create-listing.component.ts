import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  // This should eventually get changed to interact with the database
  submit(): void {
    console.log("Submit:");
    console.log(`listingTitle: ${this.listingTitle}`)
    console.log(`listingPrice: ${this.listingPrice}`)
    console.log(`listingDesc: ${this.listingDescription}`)
    
    var body = {
      name: this.listingTitle,
      price: this.listingPrice,
      description: this.listingDescription
    };

    var request = this.http.post<any>("/api/v1/listings/", body, {observe: 'response'});

    request.subscribe((data: any) => {
      console.log(`Observed post request: ${data}`)
    })
  }

}

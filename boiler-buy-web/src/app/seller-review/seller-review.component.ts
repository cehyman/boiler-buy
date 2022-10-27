import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-review',
  templateUrl: './seller-review.component.html',
  styleUrls: ['./seller-review.component.css']
})
export class SellerReviewComponent implements OnInit {
  reviewDescription:string = ""
  constructor() { }

  ngOnInit(): void {
  }
  selectedRating = '1.0';
	onSelected(value:string): void {
		this.selectedRating = value;
    // console.log(this.selectedRating)
	}
  submitReview() {
    console.log(this.selectedRating)
    console.log(this.reviewDescription)
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seller-review',
  templateUrl: './seller-review.component.html',
  styleUrls: ['./seller-review.component.css']
})
export class SellerReviewComponent implements OnInit {
  reviewDescription:string = ""
  constructor(private http: HttpClient) { }
  reviewCount:number = 0
  reviewAvg:number = 0
  reviews:string[] = []
  ngOnInit(): void {
    var accountURL = "http://localhost:8000/api/accounts/".concat("jchen@purdue.edu").concat("/");
    var request = this.http.get(accountURL, {observe:'response'});
    request.subscribe((data: any) => {
      console.log(data)
      this.reviewCount = data["body"]["sellerRatingCount"]
      this.reviewAvg = data["body"]["sellerRating"]
      this.reviews = data["body"]["sellerReviews"]
    })
  }
  selectedRating = '1.0';
	onSelected(value:string): void {
		this.selectedRating = value;
    // console.log(this.selectedRating)
	}
  submitReview() {
    // console.log(this.selectedRating)
    // console.log(this.reviewDescription)
    // console.log(this.reviewAvg)
    // console.log(this.reviews)
    // console.log(this.reviewCount)
    console.log(this.reviews)
    this.reviews.push(this.reviewDescription)
    var totalReview = this.reviewCount * this.reviewAvg
    this.reviewCount += 1
    totalReview += Number(this.selectedRating)
    console.log(totalReview)
    this.reviewAvg = totalReview / this.reviewCount
    console.log(this.reviewAvg)
    console.log(this.reviews)
    var body = {
      "sellerReviews": this.reviews,
      "sellerRatingCount": this.reviewCount,
      "sellerRating": this.reviewAvg
    };
    var accountURL = "http://localhost:8000/api/accounts/".concat("jchen@purdue.edu").concat("/");
    var patchRequest = this.http.patch<any>(accountURL, body, {observe: 'response'});
    patchRequest.subscribe((data: any) => {
      console.log(data)
    })
    alert("Review Sent")
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-review',
  templateUrl: './seller-review.component.html',
  styleUrls: ['./seller-review.component.css']
})
export class SellerReviewComponent implements OnInit {
  reviewDescription:string = ""
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute,  private router: Router) { }
  reviewCount:number = 0
  reviewAvg:number = 0
  reviews:string[] = []
  email:string = ""
  id: number = -1
  user:string = ""
  ngOnInit(): void {
    // var accountURL = "http://localhost:8000/api/accounts/".concat("jchen@purdue.edu").concat("/");
    // var request = this.http.get(accountURL, {observe:'response'});
    // request.subscribe((data: any) => {
    //   console.log(data)
    //   this.reviewCount = data["body"]["sellerRatingCount"]
    //   this.reviewAvg = data["body"]["sellerRating"]
    //   this.reviews = data["body"]["sellerReviews"]
    // })
    var urlStr = this.activatedRoute.snapshot.url.toString();
    this.id = Number(urlStr.split(',')[1]);
    if(isNaN(this.id)) {
      alert(`Invalid URL "${urlStr}": "${this.id}"`);
      return;
    }
    var accountURL = "https://boilerbuy-api.azurewebsites.net/api/products/"+this.id+"/";
    var request = this.http.get(accountURL, {observe:'response'});
    request.subscribe((data: any) => {
      console.log(data)
      this.reviewCount = data["body"]["sellerRatingCount"]
      this.reviewAvg = data["body"]["sellerRating"]
      this.reviews = data["body"]["sellerReviews"]
      this.email = data["body"]["email"]
      this.user = data["body"]["username"]
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
    var accountURL = "https://boilerbuy-api.azurewebsites.net/api/accounts/".concat(this.email).concat("/");
    var patchRequest = this.http.patch<any>(accountURL, body, {observe: 'response'});
    patchRequest.subscribe((data: any) => {
      console.log(data)
    })
    alert("Review Sent")
    this.router.navigate(['/products/search'])
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature-buttons',
  templateUrl: './feature-buttons.component.html',
  styleUrls: ['./feature-buttons.component.css']
})
export class FeatureButtonsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeUserWishlist() {
    this.router.navigate(['/wishlist'])
  }

}

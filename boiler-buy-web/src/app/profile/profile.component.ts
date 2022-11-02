import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

/* Most of user's information in profile is done in user-info comp */
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

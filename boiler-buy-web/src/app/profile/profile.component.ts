import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Globals } from '../globals';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

/* Most of user's information in profile is done in user-info comp */
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
   
  }

}

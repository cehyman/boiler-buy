import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { GroupAdInput, GroupAdObj } from '../product-types';

@Component({
  selector: 'app-groupad-listing',
  templateUrl: './groupad-listing.component.html',
  styleUrls: ['./groupad-listing.component.css']
})
export class GroupadListingComponent implements OnInit {
  @Input() object: GroupAdObj = {id:0, name: ""} as GroupAdObj

  private appcomp: AppComponent = new AppComponent();

  curremail:string = ''
  curruser:string = ''

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.curremail = <string> this.appcomp.getEmail()
    this.curruser = <string> this.appcomp.getUsername()
  }

  viewGroupAdDetails() {
    //nav to page of group id with products listing
    // console.log(this.object.name)
    // console.log(this.object.id)

    this.router.navigate(['/groupad/' + this.object.id])
  }

}

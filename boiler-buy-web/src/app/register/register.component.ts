import { Component, Input , OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { RegisterService } from '../register.service';
import {Accounts} from "../accounts"

@Component({
  selector: 'register.component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
 
  account = new Accounts()

  constructor(private registerService:RegisterService) {}
 
  ngOnInit() {
    
  }
 
  addAccount() {
    this.registerService.addAccount(this.account)
      .subscribe(data => {
        console.log(data)
      })      
  }
}

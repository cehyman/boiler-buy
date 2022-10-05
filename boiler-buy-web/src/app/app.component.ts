import { Component, HostBinding } from '@angular/core';

import {Globals} from './globals'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Boiler Buy';
  private globals: Globals = new Globals;

  saveData(username: string) {
    sessionStorage.setItem('username', username);
  }

  getData() {
    return sessionStorage.getItem('username');
  }
}
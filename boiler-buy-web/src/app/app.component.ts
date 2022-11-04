import { Component, HostBinding } from '@angular/core';
import { DeleteAccountService } from './delete-account.service';

import {Globals} from './globals'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Boiler Buy'
  private globals: Globals = new Globals

  saveUsername(username: string) {
    sessionStorage.setItem('username', username)
  }

  savePassword(password: string) {
    sessionStorage.setItem('password', password)
  }

  saveEmail(email: string) {
    sessionStorage.setItem('email', email)
  }

  saveWishlistID(wishlist_id: string) {
    sessionStorage.setItem('wishlist_id', wishlist_id)
  }

  saveWishlistProductArray(products_array: any) {
    sessionStorage.setItem('wishlist products', JSON.stringify(products_array))
  }

  getUsername() {
    return sessionStorage.getItem('username')
  }

  getPassword() {
    return sessionStorage.getItem('password')
  }

  getEmail() {
    return sessionStorage.getItem('email')
  }

  getWishlistID() {
    return sessionStorage.getItem('wishlist_id')
  }

  getWishlistProductArray() {
    return sessionStorage.getItem('wishlist products')
  }

  removeUsername() {
    sessionStorage.removeItem('username')
  }

  removePassword() {
    sessionStorage.removeItem('password')
  }

  removeEmail() {
    sessionStorage.removeItem('email')
  }

  removeWishlistID() {
    sessionStorage.removeItem('wishlist_id')
  }

  removeWishlistProductArray() {
    sessionStorage.removeItem('wishlist products')
  }
}
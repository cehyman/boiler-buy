import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-picture-carousel',
  templateUrl: './picture-carousel.component.html',
  styleUrls: ['./picture-carousel.component.css']
})
export class PictureCarouselComponent implements OnInit {

  urls: URL[] = [];
  currentIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  addUrls(urls: URL[]) {
    this.urls = this.urls.concat(urls);
  }

  next() {
    if(this.currentIndex < this.urls.length - 1)
      this.currentIndex++;
    console.log(`Current image: ${this.urls[this.currentIndex]}`);
  }

  previous() {
    if (this.currentIndex > 0)
      this.currentIndex--;

    console.log(`Current image: ${this.urls[this.currentIndex]}`);
  }
}


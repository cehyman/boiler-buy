import { Component, OnInit, Optional } from '@angular/core';

@Component({
  selector: 'app-picture-upload-new',
  templateUrl: './picture-upload-new.component.html',
  styleUrls: ['./picture-upload-new.component.css']
})
export class PictureUploadNewComponent implements OnInit {
  // Configuration for the component
  maxImages: number | null    = null;
  hideX: boolean              = false;
  
  selectedImages: SelectedImage[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  getPreviewUrls(): URL[] {
    return this.selectedImages.map(image => image.url);
  } 

  uploadFiles(event: Event) {

  }
}

class SelectedImage {
  public file:         File | null = null;     // The actual file handle
  public url:          URL | null = null;      // The URL for this photo
  public userUploaded: boolean = false;  // Was this uploaded by the user through the UI?
  public fromDatabase: boolean = false;  // Was this fetched from the database?
  public shouldRemove: boolean = false;  // Should this be removed from the database?

  static fromDatabase(file: File, url: URL): SelectedImage {
    var selectedImage = new SelectedImage();

    selectedImage.file = file;
    selectedImage.url = url;
    selectedImage.fromDatabase = true;

    return selectedImage;
  }

  static fromUser(file: File, url: URL) {
    var selectedImage = new SelectedImage();

    selectedImage.file = file;
    selectedImage.url = url;
    selectedImage.userUploaded = true;

    return selectedImage;
  }
}
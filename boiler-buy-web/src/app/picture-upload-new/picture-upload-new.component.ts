import { Component, OnInit, Optional, Input } from '@angular/core';

@Component({
  selector: 'app-picture-upload-new',
  templateUrl: './picture-upload-new.component.html',
  styleUrls: ['./picture-upload-new.component.css']
})
export class PictureUploadNewComponent implements OnInit {
  // Configuration for the component
  @Input() maxImages: number    = 100;
  @Input() hideX: boolean       = false;
  
  selectedImages: SelectedImage[] = [];
  numImages: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  // Returns all the preview URLS for the uploaded images
  getPreviewUrls(): (URL | null)[] {
    return this.selectedImages
      .filter(image => image.url !== null)
      .map(image => image.url);
  } 

  // Returns handles to all of the files for the uploaded images
  getAllFiles(): File[] {
    return this.selectedImages
      .map(image => image.file)
      .filter(file => file != null) as File[];
  }

  // Returns handles to all the new files added by the user
  // These should get added to the database
  getNewFiles(): File[] {
    return this.selectedImages
      .filter(image => image.file != null && image.userUploaded)
      .map(image => image.file) as File[];
  }

  // Returns handles to all the existing files in the database. These do not
  // need to get sent again to the database
  getExistingFiles(): File[] {
    return this.selectedImages
      .filter(image => image.file != null && image.fromDatabase)
      .map(image => image.file) as File[];
  }

  // Returns handles to all the exisitng files that should be removed from the
  // database.
  getExistingFilesToRemove(): File[] {
    return this.selectedImages
      .filter(image => image.file != null && image.shouldRemove)
      .map(image => image.file) as File[];
  }

  // Event to upload images by the user. This returns the number of images
  // uploaded. 
  uploadPhotos(event: Event): number {
    var target: HTMLInputElement = event.target as HTMLInputElement;

    var files: FileList = target.files as FileList;

    var startNum = this.numImages;

    for(var i = 0; i < files.length && this.numImages < this.maxImages; i++) {
      var file: File = files.item(i) as File;

      var reader = new FileReader();
      reader.onloadend = (event: any) => {
        this.selectedImages.push(SelectedImage.fromUser(file, event.target.result));
        this.numImages++;
      };
      reader.readAsDataURL(file);
    }

    return this.numImages - startNum;
  }

  protected removePhoto(event: Event) {
    var target = event.target as HTMLButtonElement;

    var idx = Number(target.dataset['idx']);

    if(this.selectedImages[idx].userUploaded) {
      this.selectedImages.splice(idx, 1);
      this.numImages--;
    }
    else if (this.selectedImages[idx].fromDatabase) {
      this.selectedImages[idx].shouldRemove = true;
      this.numImages--;
    }
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
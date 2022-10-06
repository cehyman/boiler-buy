import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';


/**
 * This component handles the photo-upload selection from the user.
 * 
 * The user clicks the "Upload a Picture" button, and then they can select 
 * pictures from their device's storage. When they click open, the files are
 * added to a list and the file data is turned into a preview image.
 */
@Component({
  selector: 'app-picture-upload',
  templateUrl: './picture-upload.component.html',
  styleUrls: ['./picture-upload.component.css']
})
export class PictureUploadComponent implements OnInit {
  protected selectedFiles: File[] = [];
  protected previewUrls: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  // Adds the selected files from the file input into the selected file list
  // This automatically converts the FileList object from the input element
  // into a list of File objects for convienence. The files are not converted
  addFiles(event: Event) {
    var target: HTMLInputElement | null = event.target as HTMLInputElement;

    if(target === null)
      return;
    
    var files: FileList | null = target.files;
    if(files === null)
      return;

    for (var i = 0; i < files.length; i++) {
      var file = files.item(i);
      if(file === null)
        continue;

      console.log(`Adding file ${file.name}`);

      // Add the file object to a list so we have the name and oter info.
      this.selectedFiles.push(file);

      // Convert the file of the image into a preview

      // Reader for converting the file into an image preview. This needs to be
      // local to this loop rather than being created early because it takes 
      // time for the file to be converted, and trying to convert one on the 
      // same reader will cause issues if we didn't wait for it to finish.
      var reader = new FileReader();
      reader.onloadend = (event: any) => {
        this.previewUrls.push(event.target.result);
      }
      reader.readAsDataURL(file);
    }
  }

  // This is called by one of the X buttons for the photos. The X button has a
  // custom data attribute that contains the index in the list that it is, and
  // this is used to remove the item from the list
  removePhoto(event: Event) {
    var target = event.target as HTMLButtonElement;

    if(target == null)
      return;

    // Grab the index of the button from its custom data attribute
    var idx = Number(target.dataset['idx']);
    console.log(`removing ${idx}`);

    this.selectedFiles.splice(idx, 1);
    this.previewUrls.splice(idx, 1);
  }

  getFiles(): File[] {
    return this.selectedFiles;
  }
}

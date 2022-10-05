import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-picture-upload',
  templateUrl: './picture-upload.component.html',
  styleUrls: ['./picture-upload.component.css']
})
export class PictureUploadComponent implements OnInit {
  selectedFiles: File[] = [];
  previewUrls: any[] = [];

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

    // Reader for converting the file into an image preview
    var reader = new FileReader();
    reader.onloadend = (event: any) => {
      this.previewUrls.push(event.target.result);
    }

    for (var i = 0; i < files.length; i++) {
      var file = files.item(i);
      if(file === null)
        continue;

      console.log(`Adding file ${file.name}`);

      // Add the file object to a list so we have the name and oter info.
      this.selectedFiles.push(file);

      // Convert the file of the image into a preview
      reader.readAsDataURL(file);
    }
  }

  removePhoto(event: Event, name: String) {
    console.log(`removing ${name}`);

    this.selectedFiles = this.selectedFiles.filter(item => name !== item.name);
  }
}

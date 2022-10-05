import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-picture-upload',
  templateUrl: './picture-upload.component.html',
  styleUrls: ['./picture-upload.component.css']
})
export class PictureUploadComponent implements OnInit {
  selectedFiles: File[] = [];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

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

      this.selectedFiles.push(file);
    }
  }

  removePhoto(event: Event, name: String) {
    console.log(`removing ${name}`);

    this.selectedFiles = this.selectedFiles.filter(item => name !== item.name);
  }
}

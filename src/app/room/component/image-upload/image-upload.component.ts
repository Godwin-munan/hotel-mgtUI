import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

  selectedFiles!: File;
  selectedFileNames: string[] = [];

  progressInfos: any;
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;


  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
  
    this.previews = [];
    if (this.selectedFiles) {
      const numberOfFiles = this.selectedFiles;
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
  
        reader.readAsDataURL(this.selectedFiles);
  
        this.selectedFileNames.push(this.selectedFiles.name);
      }
    }
  }

  uploadFiles(): void {
    this.message = [];
  
    if (this.selectedFiles) {
        this.upload(this.selectedFiles);
    }
  }


  upload(file: File): void {
    this.progressInfos = { fileName: file.name };
  
    // if (file) {
    //   this.uploadService.upload(file).subscribe(
    //     (event: any) => {
    //       if (event.type === HttpEventType.UploadProgress) {
    //         this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
    //       } else if (event instanceof HttpResponse) {
    //         const msg = 'Uploaded the file successfully: ' + file.name;
    //         this.message.push(msg);
    //         this.imageInfos = this.uploadService.getFiles();
    //       }
    //     },
    //     (err: any) => {
    //       this.progressInfos[idx].value = 0;
    //       const msg = 'Could not upload the file: ' + file.name;
    //       this.message.push(msg);
    //     });
    // }
  }


}

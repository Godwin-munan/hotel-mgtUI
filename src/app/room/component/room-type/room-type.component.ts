import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss']
})
export class RoomTypeComponent {
  panelOpenState = false;
  types: string[] = ['hello world', 'hello world',];

  selectedFiles!: File;
  selectedFileNames: string[] = [];







}

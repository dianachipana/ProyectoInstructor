import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-instructor-upload-poster',
  templateUrl: './instructor-upload-poster.component.html',
  styleUrls: ['./instructor-upload-poster.component.scss']
})
export class InstructorUploadPosterComponent implements OnInit {
  @Input() poster: string;
  @Output() selected: EventEmitter<File> = new EventEmitter<File>();

  file: File;

  constructor() { }

  ngOnInit(): void {
  }

}

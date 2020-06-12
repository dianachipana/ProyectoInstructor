import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-instructor-delete-modal',
  templateUrl: './instructor-delete-modal.component.html',
  styleUrls: ['./instructor-delete-modal.component.scss']
})
export class InstructorDeleteModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InstructorDeleteModalComponent>) { }

  ngOnInit(): void {
  }

  close(remove = false) {
    this.dialogRef.close(remove);
  }

}

import { Component, OnInit } from '@angular/core';
import { InstructorPresenter } from './instructors.presenter';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss'],
  providers: [ InstructorPresenter ]
})
export class InstructorsComponent implements OnInit {

  constructor(public presenter: InstructorPresenter) { }

  ngOnInit(): void {
    this.presenter.loadInstructors();
  }

}

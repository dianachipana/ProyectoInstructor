import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Instructor} from '../../../models/instructor.model';
import { Workshop,  WorkshopItemResponse } from '@galaxy/commons/models';


@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.scss']
})
export class InstructorFormComponent implements OnInit, OnChanges {
  @Input() workshop: Workshop;
  @Input() instructors: Instructor[] = [];
  @Output() save: EventEmitter<WorkshopItemResponse> = new EventEmitter<WorkshopItemResponse>();
  form: FormGroup;

  patternEmail="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
  get nameField() {
    return this.form.get('fullName') as FormControl;
  }

  get emailField(){
    return this.form.get('mail') as FormControl;
  }

  get emailValidator(){
    if (this.emailField.hasError('required')) {
      return 'Campo es requerido';
    }
    if(this.emailField.hasError('pattern')) {
      return 'email no válido';
    }

    return '';
  }

  get nameErrors() {
    if (this.nameField.hasError('required')) {
      return 'Campo es requerido';
    }

    return '';
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      mail: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log(this.workshop);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.workshop?.currentValue) {
      this.updateFormValues(changes.workshop.currentValue);
    }
  }

  updateFormValues(workshop: Workshop) {
    console.log("valor", workshop.instructor.mail)
    this.form.patchValue({
      mail: workshop.instructor.mail,
      fullName: workshop.instructor.fullName,
    });
   
  }

  send() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }



}





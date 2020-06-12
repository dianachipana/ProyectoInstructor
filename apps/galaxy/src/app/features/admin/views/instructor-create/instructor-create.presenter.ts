import { Injectable } from '@angular/core';
import { Instructor, InstructorResponse } from '../../models/instructor.model';
import { InstructorsHttp } from '../../commons/http/instructors.http';
import { GlxWorkshopsHttp } from '@galaxy/commons/http/workshop';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { WorkshopRequest } from '@galaxy/commons/models';
import { GlxLoadingComponent } from '@galaxy/commons/components';

@Injectable()
export class InstructorCreatePresenter {

  instructors: Instructor[] = [];

  constructor(
    private instructorsHttp: InstructorsHttp,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  loadInstructors() {
    const loading = this.dialog.open(GlxLoadingComponent, { disableClose: true });
    this.instructorsHttp.getAll()
    .pipe(finalize(() => loading.close()))
    .subscribe(instructors => this.instructors = instructors);
  }

  createInstructor(body: InstructorResponse) {
    const loading = this.dialog.open(GlxLoadingComponent, { disableClose: true });
    this.instructorsHttp.create(body)
    .pipe(finalize(() => loading.close()))
    .subscribe(_ => this.goInstructores());
  }

  goInstructores() {
    this.router.navigateByUrl('/administrador/instructores');
  }

  goUpdatePage(instructorId: string) {
    this.router.navigate(['/administrador/instructores/actualizar', instructorId]);
  }
}

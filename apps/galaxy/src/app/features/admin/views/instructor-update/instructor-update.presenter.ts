import { Injectable } from '@angular/core';
import { Instructor, InstructorResponse } from '../../models/instructor.model';
import { GlxLoadingComponent } from '@galaxy/commons/components';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { InstructorsHttp } from '../../commons/http/instructors.http';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { GlxWorkshopsHttp } from '@galaxy/commons/http/workshop';


@Injectable()
export class InstructorUpdatePresenter {

  instructors: Instructor[] = [];
  instructorId: string;

  constructor(
    private instructorsHttp: InstructorsHttp,
    private workshopsHttp: GlxWorkshopsHttp,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  initial() {
    this.instructorId = this.route.snapshot.paramMap.get('id');

    const loading = this.dialog.open(GlxLoadingComponent, { disableClose: true });

    forkJoin({
      instructores: this.instructorsHttp.getAll()
    })
    .pipe(finalize(() => loading.close()))
    .subscribe(
      ({ instructores }) => {
        this.instructors = instructores;
        },
      (err) => {
        console.log(err);
      }
    );
  }


  updateInstructor(body: Instructor) {
    const loading = this.dialog.open(GlxLoadingComponent, { disableClose: true });
    this.instructorsHttp.update(this.instructorId, body)
    .pipe(finalize(() => loading.close()))
    .subscribe(_ => this.goInstructors());
  }

  /*updateInstructorPoster(poster: File) {
    const loading = this.dialog.open(GlxLoadingComponent, { disableClose: true });
    this.workshopsHttp.updatePoster(this.workshopId, poster)
    .pipe(finalize(() => loading.close()))
    .subscribe(realitveUrl => {
      this.workshop.updatePoster(realitveUrl);
    });
  }*/

  goInstructors() {
    this.router.navigateByUrl('/administrador/instructores');
  }
}

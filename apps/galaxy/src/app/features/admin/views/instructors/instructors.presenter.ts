import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GlxLoadingComponent } from '@galaxy/commons/components';
import { finalize } from 'rxjs/operators';
import { deleteElementList } from '@galaxy/commons/utils';
import { WorkshopDeleteModalComponent } from '../../commons/components/workshop-delete-modal/workshop-delete-modal.component';
import { InstructorsHttp } from '../../commons/http/instructors.http';

@Injectable() export class InstructorPresenter{

  dataSource = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private instructorsHttp: InstructorsHttp
  ) {}

  loadInstructors() {
    const loading = this.dialog.open(GlxLoadingComponent, { disableClose: true });
    this.instructorsHttp.getAll()
    .pipe(finalize(() => loading.close()))
    .subscribe(instructors => this.dataSource = instructors);
  }

  deleteInstructor(instructorId: string) {
    const loading = this.dialog.open(GlxLoadingComponent, { disableClose: true });
    this.instructorsHttp.delete(instructorId)
    .pipe(finalize(() => loading.close()))
    .subscribe(_ => {
      this.dataSource = deleteElementList(this.dataSource, instructor => instructor.id === instructorId);
    });
  }

  goCreatePage() {
    this.router.navigateByUrl('/administrador/instructores/nuevo');
  }

  goUpdatePage(instructorId: string) {
    this.router.navigate(['/administrador/instructores/actualizar', instructorId]);
  }

  goDeleteModal(instructorId: string) {
    const modal = this.dialog.open(WorkshopDeleteModalComponent, { disableClose: true });
    modal.afterClosed().subscribe((remove: boolean) => {
      if (remove) { this.deleteInstructor(instructorId); }
    });
  }
}

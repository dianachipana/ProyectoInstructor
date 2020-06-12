import { Injectable } from '@angular/core';
import { GlxWorkshopsHttp } from '@galaxy/commons/http/workshop';
import { Workshop } from '@galaxy/commons/models';
import { finalize } from 'rxjs/operators';

@Injectable()
export class WorkshopsPresenter {

    workshops: Workshop[] = [];
    loading = true;

    constructor(private workshopsHttp: GlxWorkshopsHttp) {}

    loadWorkshops() {
        this.workshopsHttp.getAll()
        .pipe(finalize(() => this.loading = false))
        .subscribe(
          workshops => this.workshops = workshops,
          err => console.log(err)
        );
    }

}

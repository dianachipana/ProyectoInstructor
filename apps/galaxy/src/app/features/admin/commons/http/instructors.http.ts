import { Injectable } from '@angular/core';
import { HttpModule } from './http.module';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/galaxy/src/environments/environment';
import { InstructorResponse, Instructor } from '../../models/instructor.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: HttpModule
})
export class InstructorsHttp {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Instructor[]> {
    return this.http.get<InstructorResponse[]>(`${environment.api}/instructors`)
    .pipe(
      map((instructorsRes: InstructorResponse[]) => {
        return instructorsRes.map((intructorRes: InstructorResponse) => new Instructor(intructorRes));
      })
    );
  }

  create(body: InstructorResponse) {
    return this.http.post(`${environment.api}/instructors`, body);
  }

  update(instructorId: string, body: Instructor) {
    return this.http.put(`${environment.api}/instructors/${instructorId}`, body);
  }
  delete(instructorId: string) {
    return this.http.delete(`${environment.api}/instructors/${instructorId}`);
  }

}

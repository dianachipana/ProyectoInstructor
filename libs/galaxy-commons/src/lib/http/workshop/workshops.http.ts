import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/galaxy/src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GlxWorkshopsHttpModule } from './workshops.module';
import { WorkshopItemResponse, Workshop } from '../../models';
import { WorkshopRequest } from '../../models/workshop.model';

@Injectable({
    providedIn: GlxWorkshopsHttpModule
})
export class GlxWorkshopsHttp {

    constructor(private http: HttpClient) {}

    getAll(): Observable<Workshop[]> {
        return this.http.get<WorkshopItemResponse[]>(`${environment.api}/workshops`)
        .pipe(
            map((workshopsResponse: WorkshopItemResponse[]) => {
                return workshopsResponse.map((workshopItemResponse: WorkshopItemResponse) =>  {
                    return new Workshop(workshopItemResponse);
                });
            })
        );
    }

    getOne(workshopId: string): Observable<Workshop> {
      return this.http.get<WorkshopItemResponse>(`${environment.api}/workshops/${workshopId}`)
      .pipe(
          map((workshopResponse: WorkshopItemResponse) => {
            return new Workshop(workshopResponse);
          })
      );
  }

    create(body: WorkshopRequest) {
      return this.http.post(`${environment.api}/workshops`, body);
    }

    update(workshopId: string, body: WorkshopRequest) {
      return this.http.put(`${environment.api}/workshops/${workshopId}`, body);
    }

    delete(workshopId: string) {
      return this.http.delete(`${environment.api}/workshops/${workshopId}`);
    }

    updatePoster(workshopId: string, poster: File): Observable<string> {
      const body = new FormData();
      body.set('poster', poster);

      return this.http.put<{ poster: string }>(`${environment.api}/workshops/${workshopId}/poster`, body)
      .pipe(
        map( (originalResponse) => originalResponse.poster )
      );
    }
}

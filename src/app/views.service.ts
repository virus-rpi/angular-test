import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, interval, map, Observable, startWith, switchMap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewsService {
  private readonly API_URL = 'http://localhost:3000/views';

  constructor(private readonly http: HttpClient) {
  }

  getLiveViewsForId(houseId: number): Observable<number> {
    return interval(1000).pipe(
      startWith(0),
      switchMap(() => {
        return this.http.get<{ views: number }>(`${this.API_URL}/${houseId}`);
      }),
      map((response) => response.views)
    );
  }

  addView(houseId: number): Observable<void> {
    return this.http.get<{ views: number }>(`${this.API_URL}/${houseId}`).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return this.http.post<void>(this.API_URL, {id: houseId, views: 1}).pipe(
            map(() => ({views: 1}))
          );
        } else {
          return throwError(() => error);
        }
      }),
      switchMap((record) =>
        this.http.patch<void>(`${this.API_URL}/${houseId}`, {
          views: (record).views + 1,
        })
      )
    );
  }
}

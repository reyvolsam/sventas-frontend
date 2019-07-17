
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'

import { environment } from '../../../environments/environment';

import { Campus } from 'src/app/models/Campus'

@Injectable({
  providedIn: 'root'
})
export class CampusService {

  baseUrl = environment.baseUrl;

  clientes = []

  constructor(private http: HttpClient) { }

  getCampus()
  {
    return this.http.post<any>(this.baseUrl+'/campus/lists', {})
    .pipe(
      map(res => res),
      catchError( err => this.handleError(err))
    )
  }

  saveCampus(campus:Campus)
  {
    return this.http.post<any>(this.baseUrl+'/campus', campus)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  updateCampus(campus:Campus)
  {
    return this.http.put<any>(this.baseUrl+'/campus/'+campus.id, campus)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  deleteCampus(id: Number)
  {
    return this.http.delete<any>(this.baseUrl+'/campus/'+id)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//deleteCampus()

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

}////

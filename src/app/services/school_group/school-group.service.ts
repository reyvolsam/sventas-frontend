import { Injectable } from '@angular/core';
import { SchoolGroup } from 'src/app/models/SchoolGroup';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolGroupService {

  baseUrl = environment.baseUrl;
  school_group:SchoolGroup

  constructor(private http: HttpClient) { }

  getSchoolGroups()
  {
    return this.http.get<any>(this.baseUrl+'/group')
    .pipe(
      catchError( err => this.handleError(err))
    )
  }//

  saveSchoolGroup(school_group:SchoolGroup)
  {
    return this.http.post<any>(this.baseUrl+'/group', school_group)
    .pipe(
      catchError( err => this.handleError(err))
    )
  }//

  updateSchoolGroup(school_group:SchoolGroup)
  {
    return this.http.put<any>(this.baseUrl+'/group/'+school_group.id, school_group)
    .pipe(
      catchError( err => this.handleError(err))
    )
  }//

  deleteSchoolGroup(id: Number)
  {
    return this.http.delete<any>(this.baseUrl+'/group/'+id)
    .pipe(
      catchError( err => this.handleError(err))
    )
  }//deleteUser()

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

}////

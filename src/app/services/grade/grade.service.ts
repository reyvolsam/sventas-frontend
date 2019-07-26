import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Grade } from 'src/app/models/Grade'
import { environment } from '../../../environments/environment'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  baseUrl = environment.baseUrl;
  grade:Grade

  constructor(private http: HttpClient) { }

  getGrades()
  {
    return this.http.get<any>(this.baseUrl+'/grade')
    .pipe(
      catchError( err => this.handleError(err))
    )
  }//

  saveGrade(grade:Grade)
  {
    return this.http.post<any>(this.baseUrl+'/grade', grade)
    .pipe(
      catchError( err => this.handleError(err))
    )
  }//

  updateGrade(grade:Grade)
  {
    return this.http.put<any>(this.baseUrl+'/grade/'+grade.id, grade)
    .pipe(
      catchError( err => this.handleError(err))
    )
  }//

  deleteGrade(id: Number)
  {
    return this.http.delete<any>(this.baseUrl+'/grade/'+id)
    .pipe(
      catchError( err => this.handleError(err))
    )
  }//deleteUser()

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

}////

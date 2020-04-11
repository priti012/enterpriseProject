import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse,HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Employee } from './employeeDetail/employee-detail/model';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  employeesUrl = 'api/employees';  // URL to web api
  employees: Employee[];
  constructor(private http: HttpClient) {
  }
  getEmployeesContact(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error.message);
        })
      );
  }

  searchEmployeesContact(term: string): Observable<Employee[]> {
    term = term.trim();
    let searchedEmployee;
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};
    searchedEmployee = this.http.get<Employee[]>(this.employeesUrl, options)
     .pipe(
      catchError((error) => {
        console.error(error);
        return throwError(error.message);
      })
    );
    return searchedEmployee;
  }
  addEmployeeContact(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, employee, httpOptions)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error.message);
        })
      );
  }
  updateEmployeeContact(employee: Employee): Observable<Employee> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Employee>(this.employeesUrl, employee, httpOptions)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error.message);
        })
      );
  }

   /** DELETE: delete the hero from the server */
   deleteEmployeeContact(id: number): Observable<{}> {
    const url = `${this.employeesUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError((error) => {
          return throwError(error.message);
        })
      );
  }

}

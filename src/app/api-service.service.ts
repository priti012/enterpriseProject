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
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error.message);
        })
      );
  }

  searchEmployees(term: string): Observable<Employee[]> {
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
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, employee, httpOptions)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error.message);
        })
      );
  }
  updateEmployee (employee: Employee): Observable<Employee> {
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

}

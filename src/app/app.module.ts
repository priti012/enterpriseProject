import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDetailComponent } from './employeeDetail/employee-detail/employee-detail.component';
import {ApiServiceService} from './../app/api-service.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './employeeDetail/in-memory-web-api.service';
import { HttpClientXsrfModule } from '@angular/common/http';
import { AddEmployeeComponent } from './employeeDetail/addEmployee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './employeeDetail/editEmployee/edit-employee/edit-employee.component';
import { RouterModule, Routes } from '@angular/router';
const appRoutes: Routes = [
  { path: 'employees/add', component: AddEmployeeComponent },
  { path: 'employees/:id/edit',      component: EditEmployeeComponent },
  { path: '**', component: EmployeeDetailComponent },
  { path: '', component: AppComponent },
  { path: 'employees', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailComponent,
    AddEmployeeComponent,
    EditEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {
        dataEncapsulation: false,
        passThruUnknownUrl: true,
        put204: false // return entity after PUT/update
      }
    ),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

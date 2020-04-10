import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../api-service.service';
import { Employee } from './../../employee-detail/model';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  editEmployee: Employee[];
  id: string;
  addEmployee: Employee;
  _id;
  constructor(private apiServiceService: ApiServiceService, public route: ActivatedRoute) { }
  employees: Employee[];
  ngOnInit() {
    this._id = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.id = this.id.replace(':', '');
      this.editEmployee =this.apiServiceService.employees.filter((employee) => {
        return (employee.id === Number(this.id));
      });
      this.addEmployee = this.editEmployee[0];
   });

  }
  formSubmit() {
    this.update();
  }
  update() {
    if (this.addEmployee) {
      this.apiServiceService
        .updateEmployee(this.addEmployee)
        .subscribe(employee => {
        const ix = employee ? this.apiServiceService.employees.findIndex(h => h.id === employee.id) : -1;
        if (ix > -1) {
          this.apiServiceService.employees[ix] = employee;
        }
      });
      this.editEmployee = undefined;
      this.addEmployee = undefined;
    }
  }
}

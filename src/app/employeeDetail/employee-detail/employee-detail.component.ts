import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { Employee } from './../employee-detail/model';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employees: Employee[];
  editEmployee: Employee;
  isForm: boolean;
  nameText: string;
  addEmployee: Employee = {
    id: 1,
    fname: '',
    phone: 1111111,
    lname: '',
    status: ''
  };

  constructor(public apiServiceService: ApiServiceService) {}

  ngOnInit() {
    if (!this.apiServiceService.employees && !this.nameText) {
      this.getEmployees();
    }
  }

  getEmployees(): void {
      this.isForm = false;
      this.apiServiceService.getEmployeesContact()
        .subscribe(employees => (this.apiServiceService.employees = employees));
  }

  deleteEmployee(id) {
    this.apiServiceService.employees = this.apiServiceService.employees.filter((employee) => {
      return employee.id !== id;
    });
    let deletedEmployee: Employee;
    this.apiServiceService.deleteEmployeeContact(id).subscribe((employees) => {
      deletedEmployee = employees;
    });
  }
}


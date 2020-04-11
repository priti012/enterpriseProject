import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../api-service.service';
import { Employee } from './../../employee-detail/model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  idNumber : number;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  isValidFormSubmitted = false;
  constructor(private apiServiceService: ApiServiceService) { }
  addEmployee: Employee = {
    id: 1,
    fname: '',
    phone: undefined,
    lname: '',
    status: ''
  };
  statusList = ['Active', 'Inactive'];
  employee: Employee[];
  ngOnInit() {
    console.log('statusList '+ this.statusList);
    if(this.apiServiceService.employees){
    this.idNumber = this.apiServiceService.employees.length +1;
    this.addEmployee.id = this.idNumber;
    }
  }
  add(): void {
    let name;
    if (this.addEmployee ) {
      this.addEmployee.fname = this.addEmployee.fname.trim();
      this.addEmployee.lname = this.addEmployee.lname.trim();
      this.addEmployee.status = this.addEmployee.status.trim();
      this.addEmployee.phone = this.addEmployee.phone;
      name = this.addEmployee.fname;
      let employee = this.addEmployee;
      if (!this.addEmployee.fname || !this.addEmployee.phone.toString().match(/[0-9]/)) {
        return;
      }
      const newEmployee: Employee = employee ;
      this.apiServiceService
      .addEmployeeContact(newEmployee)
      .subscribe((employees) => {
        this.apiServiceService.employees.push(employees);
      });
    }

  }
  formSubmit() {
    this.add();
  }
}

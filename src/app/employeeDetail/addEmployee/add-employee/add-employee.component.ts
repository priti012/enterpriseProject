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
    name: '',
    phone: 1111111,
    address: {
      city: '',
      addressline1: '',
      addressline2: '',
      postalcode: ''
    }
  };
  employee: Employee[];
  ngOnInit() {
    if(this.apiServiceService.employees){
    this.idNumber = this.apiServiceService.employees.length +1;
    this.addEmployee.id = this.idNumber;
    }
  }
  add(): void {
    let name;
    if (this.addEmployee ) {
      this.addEmployee.name = this.addEmployee.name.trim();
      this.addEmployee.address.city = this.addEmployee.address.city.trim();
      this.addEmployee.address.addressline1 = this.addEmployee.address.addressline1.trim();
      this.addEmployee.address.addressline2 = this.addEmployee.address.addressline2.trim();
      this.addEmployee.address.postalcode = this.addEmployee.address.postalcode.trim();
      this.addEmployee.phone = this.addEmployee.phone;
      name = this.addEmployee.name;
      let employee = this.addEmployee;
      if (!this.addEmployee.name || !this.addEmployee.phone.toString().match(/[0-9]/)) {
        return;
      }
      const newEmployee: Employee = {employee} as Employee;
      this.apiServiceService
      .addEmployee(newEmployee)
      .subscribe((employees) => {
        this.apiServiceService.employees.push(employees.employee);
      });
    }

  }
  formSubmit() {
    this.add();
  }
  onFormSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
       return;
    }
    this.isValidFormSubmitted = true;
    form.resetForm();
 }
}

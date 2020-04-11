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
    name: '',
    phone: 1111111,
    address: {
      city: '',
      addressline1: '',
      addressline2: '',
      postalcode: ''
    }
  };

  constructor(public apiServiceService: ApiServiceService) {}

  ngOnInit() {
    if(!this.apiServiceService.employees && !this.nameText){
      this.getEmployees();
    }
  }

  getEmployees(): void {
      this.isForm = false;
      this.apiServiceService.getEmployees()
        .subscribe(employees => (this.apiServiceService.employees = employees))
  }


  search(searchTerm: string) {
    this.isForm = false;
    this.editEmployee = undefined;
    const searchItem2 = searchTerm.trim().toLowerCase();
    if (searchItem2) {
          this.apiServiceService.employees = this.apiServiceService.employees.filter((employee) => {
            console.log(employee.address.city.toLowerCase().indexOf(searchItem2));
            if (employee.address && employee.name) {
              if (employee.address.city && employee.name) {
                return employee.address.city.toLowerCase().
                toString().indexOf(searchItem2) > -1 || employee.name.toLowerCase().indexOf(searchItem2) > -1;
              }
            } else if (employee.name || !employee.address) {
              return  employee.name.toLowerCase().indexOf(searchItem2) > -1;
            }
        });
  }
  }

}


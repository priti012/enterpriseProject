import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees = [{
      id: 1,
      fname: 'Jhon',
      phone: '9999999999',
      lname: 'Kha',
      status: 'Active'
      }, {
      id: 2,
      fname: 'Jacob',
      phone: 'AZ99A99PQ9',
      lname: 'kum',
      status: 'Inactive'
      }, {
      id: 3,
      fname: 'Ari',
      phone: '145458522',
      lname: 'Yum',
      status: 'Inactive'
      }
    ];
    return  {employees};
}

}

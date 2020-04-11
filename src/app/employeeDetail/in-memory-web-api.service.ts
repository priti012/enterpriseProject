import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees = [{
      id: 1,
      name: "Jhon",
      phone: "9999999999",
      address:{
          city: "Pune",
          addressline1:"ABC road",
          addressline2:"XYZ building",
          postalcode:"12455"
          }
      }, {
      id: 2,
      name: "Jacob",
      phone: "AZ99A99PQ9",
      address:{
        city: "Pune",
        addressline1:"PQR road",
        addressline2:"ABC building",
        postalcode:"13455"
        }
      }, {
      id: 3,
      name: "Ari",
      phone: "145458522",
      address:{
        city: "Mumbai",
        addressline1:"ABC road",
        addressline2:"XYZ building",
        postalcode:"12455"
        }
      }
    ];
  return {employees};
}

}

export interface Employee {
  id?: number,
  name?: string,
  phone?: number,
  address?:address
}
export interface address {
  city?: string,
  addressline1?:string,
  addressline2?:string,
  postalcode?:string
}

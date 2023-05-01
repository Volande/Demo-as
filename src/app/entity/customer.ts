import {User} from "./user";
import {Ordered_product} from "./ordered_product";

export interface Customer {
  id: number;
  created: string;
  update: string;
  user: User;
  email:string;
  sum: number;
  status: string;
  firstName : string;
  lastName : string;
  address:string;
  postOffice : string;
  departmentPostOffice : string;
  numberPhone : string;
  orders:Ordered_product[]
}

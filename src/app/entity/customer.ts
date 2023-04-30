import {User} from "./user";

export interface Customer {
  id: number;
  created: string;
  update: string;
  user: User;
  sum: number;
  status: string;
  firstName : string;
  lastName : string;
  postOffice : string;
  departmentPostOffice : string;
  numberPhone : string;
}

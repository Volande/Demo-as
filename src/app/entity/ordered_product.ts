import {Size} from "./size";
import {Clothes} from "./clothes";
import {Customer} from "./customer";

export interface Ordered_product {
  id:number;
  customer:Customer;
  amount:number;
  price:number;
  size:Size;
  product:Clothes;

}

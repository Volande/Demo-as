import {Size} from "./size";
import {Product} from "./product";
import {Customer} from "./customer";

export interface Ordered_product {
  id:number;
  customer:Customer;
  amount:number;
  price:number;
  size:Size;
  product:Product;

}

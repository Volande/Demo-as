import {Size} from "./size";
import {Clothes} from "./clothes";
import {Order} from "./order";

export interface OrderDetails{
  id:number;
  order:Order;
  amount:number;
  price:number;
  size:Size;
  product:Clothes;

}

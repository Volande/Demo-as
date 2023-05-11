import {Image} from "./image";
import {Size} from "./size";
import {ProductInformation} from "./product-information";

export interface Product_dto {
  id: number;
  image: Image[];
  size: Array<Size>;
  collection:string;
  categories: Array<string>;
  price: number;
  availability: string;
  quantity:number;
  productInformation:ProductInformation[];
}

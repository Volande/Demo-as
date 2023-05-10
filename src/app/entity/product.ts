import {Image} from "./image";
import {Size} from "./size";
import {Categories} from "./categories";
import {Collection} from "./collection";
import {ProductInformation} from "./product-information";

export interface Product {
  id: number;
  image: Image[];
  size: Size[] ;
  price: number;

  collection:Collection;
  categories:Categories[];
  productCategories: Categories[];
  productInformation:ProductInformation[];
  quantity:number;
}

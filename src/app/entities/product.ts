import {Image} from "./image";
import {Size} from "./size";
import {Categories} from "./categories";
import {Collection} from "./collection";
import {ProductInformation} from "./product-information";
import {Availability} from "./availability";

export interface Product {
  id: number;
  image: Image[];
  size: Size[] ;
  price: number;

  availability:Availability;
  collection:Collection;
  categories:Categories[];
  productCategories: Categories[];
  productInformation:ProductInformation[];
  quantity:number;
}

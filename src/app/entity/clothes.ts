import {Image} from "./image";
import {Size} from "./size";
import {Categories} from "./categories";
import {Collection} from "./collection";

export interface Clothes {
  id: number;
  title: string;
  image: Image[];
  size: Size[];
  price: number;
  content: string;
  compound:string;
  availability: string;
  collection:Collection;
  categories:Categories[];
  productCategories: Categories[];
  quantity:number;
}

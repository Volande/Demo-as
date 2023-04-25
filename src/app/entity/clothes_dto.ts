import {Image} from "./image";
import {Size} from "./size";

export interface Clothes_dto {
  id: number;
  title: string;
  image: Image[];
  size: Array<Size>;
  collection:string;
  categories: Array<string>;
  price: number;
  content: string;
  compound:string;
  availability: string;
  quantity:number;
}

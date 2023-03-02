import {Image} from "./image";
import {Size} from "./size";

export interface Clothes {
  id: number;
  title: string;
  image: Image[];
  size:Size[];
  price: number;
  content: string;
  compound:string;
  availability: boolean;
}

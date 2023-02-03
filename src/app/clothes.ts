import {Image} from "./image";

export interface Clothes {
  id: number;
  title: string;
  image: Image[];
  size: string[];
  price: string;
  content: string;
  compound:string;
}

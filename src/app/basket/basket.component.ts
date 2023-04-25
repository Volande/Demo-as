import {Component, Input, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {ClothesService} from "../clothes.service";
import {Clothes} from "../entity/clothes";
import {Size} from "../entity/size";
import {ClothesCart} from "../entity/clothesCart";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  cartClothes: Clothes[] = [];
  totalQuantity: number;
  price: number;
  totalPrice: number;

  size: Size[];

  clothesNew:Clothes;


  constructor(private clothesService: ClothesService) {
  }

  ngOnInit(): void {
    this.cartClothes
    this.clothesService.event.subscribe(clothes => {
      let index = -1;
      index = this.cartClothes.findIndex(
        c => c.id === clothes.id,
      );


      this.cartClothes.push(clothes)


      this.sum();
    })

  }


  deleteProduct(id: number) {
    let index = this.cartClothes.findIndex(item => item.id === id);
    this.cartClothes.splice(index, 1);
    this.sum();
  }

  sum(): void {
    this.totalQuantity = 0;
    this.price = 0;
    this.totalPrice = 0;
    if (this.cartClothes != null) {
      this.cartClothes.map(clothes => {
        this.totalQuantity += clothes.quantity;
        this.price += clothes.price;
        this.totalPrice += clothes.price * clothes.quantity;

      });
    }
  }


}

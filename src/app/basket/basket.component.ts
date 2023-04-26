import {Component, Input, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {ClothesService} from "../clothes.service";
import {Clothes} from "../entity/clothes";
import {Size} from "../entity/size";
import {ClothesCart} from "../entity/clothesCart";
import {ClothesPageComponent} from "../clothes-page/clothes-page.component";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  cartClothes: Clothes[] = [];
  totalQuantity: number = 0;
  price: number;
  totalPrice: number = 0;

  size: Size[];

  clothesNew: Clothes;


  constructor(private clothesService: ClothesService,
             ) {
  }

  ngOnInit(): void {


    this.clothesService.event.subscribe(clothes => {
      let index = -1
      index = this.cartClothes.findIndex(
        c => c.id === clothes.id && c.size[0].title == clothes.size[0].title
      )

      if (index != -1) {
        this.cartClothes[index].quantity += 1
      } else if (index === -1) {
        this.cartClothes.push(clothes)
      }

      this.sum();
    })

  }

  decreaseCartItem(clothe:Clothes) {
    let index = this.cartClothes.findIndex(item => item.id === clothe.id && item.size[0].title == clothe.size[0].title);
    this.cartClothes[index].quantity -=1
    if(this.cartClothes[index].quantity == 0){
      this.cartClothes.splice(index, 1);
    }
    this.sum()
  }

  increaseCartItem(clothe:Clothes) {
    let criterionsFilter: any = JSON.parse(JSON.stringify(clothe));
    this.clothesService.event.emit( criterionsFilter)
  }


  deleteProduct(clothe: Clothes) {
    let index = this.cartClothes.findIndex(item => item.id === clothe.id && item.size[0].title == clothe.size[0].title);
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

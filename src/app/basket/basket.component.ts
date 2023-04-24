import {Component, Input, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {ClothesService} from "../clothes.service";
import {Clothes} from "../entity/clothes";
import {Size} from "../entity/size";

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
  size:Size;


  constructor(private clothesService: ClothesService) {
  }

  ngOnInit(): void {
    this.clothesService.event.subscribe(clothes=>{
      alert("cart-list-ngOnInit");
      let index=-1;
      index=this.cartClothes.findIndex(
        c=> c.id === clothes.id
      );

      if (index != -1){
        this.cartClothes[index].quantity +=1;
      }else {
        this.cartClothes.push(clothes)
      }
      this.sum();
    })
    this.clothesService.eventSize.subscribe(size => this.size = size)
  }


  deleteProduct(id:number) {
    let index = this.cartClothes.findIndex(item => item.id === id);
    this.cartClothes.splice(index, 1);
    this.sum();
  }

  sum(): void {
    this.totalQuantity = 0;
    this.price = 0;
    this.totalPrice = 0;
    if (this.cartClothes) {
      this.cartClothes.map(clothes => {
        this.totalQuantity += clothes.quantity;
        this.price += clothes.price;
        this.totalPrice += clothes.price * clothes.quantity;
      });
      // for (let i = 0; i < this.cartProducts.length; i++) {
      //   this.totalQuantity += this.cartProducts[i].product_quanity;
      //   this.price += this.cartProducts[i].product_price;
      //   this.totalPrice +=
      //     this.cartProducts[i].product_price * this.cartProducts[i].product_quanity;
      // }
    }
  }


}

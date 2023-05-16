import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AppComponent} from "../app.component";
import {ProductsService} from "../products.service";
import {Product} from "../entities/product";
import {Size} from "../entities/size";
import {Products_cart} from "../entities/products_cart";
import {ClothePageComponent} from "../clothe-page/clothe-page.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  cartClothes: Product[] = [];
  totalQuantity: number = 0;
  price: number;
  totalPrice: number = 0;

  size: Size[];

  clothesNew: Product;


  constructor(private productsService: ProductsService,
              private router: Router,) {
  }

  ngOnInit(): void {

    if (localStorage.getItem("selectedClothes")) {
      this.cartClothes = JSON.parse(localStorage.getItem("selectedClothes") || '{}')

      this.sum();
    }

    this.productsService.event.subscribe(clothes => {
      let index = -1
      index = this.cartClothes.findIndex(
        c => c.id === clothes.id && c.size[0].title == clothes.size[0].title
      )

      if (index != -1) {
        this.cartClothes[index].quantity += 1
      } else if (index === -1) {
        this.cartClothes.push(clothes)
      }
      let selectedClothes: any = JSON.stringify(this.cartClothes)
      localStorage.setItem("selectedClothes", selectedClothes)
      this.sum();
    })

  }

  decreaseCartItem(clothe: Product) {
    let index = this.cartClothes.findIndex(item => item.id === clothe.id && item.size[0].title == clothe.size[0].title);
    this.cartClothes[index].quantity -= 1
    if (this.cartClothes[index].quantity == 0) {
      this.cartClothes.splice(index, 1);
    }
    this.sum()
  }

  increaseCartItem(clothe: Product) {
    let criterionsFilter: any = JSON.parse(JSON.stringify(clothe));
    this.productsService.event.emit(criterionsFilter)
  }


  deleteProduct(clothe: Product) {
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

  replacePage(): void {
    this.router.navigateByUrl('/ordering')
  }


  orderingClothes() {
    let selectedClothes: any = JSON.stringify(this.cartClothes)
    localStorage.setItem("selectedClothes", selectedClothes)
    this.replacePage()
  }



}

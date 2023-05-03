import { Component, OnInit } from '@angular/core';
import {Product} from "../entity/product";
import {ProductsService} from "../products.service";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  clothes : Product[] = [];

  constructor(private userService:UserService,
              private productsService:ProductsService) { }

  ngOnInit(): void {
    this.getPublicContent();
    this.productsService.removeCriterionsFilter();
  }



  getPublicContent(): void {
      this.userService.getPublicContent()
        .subscribe(clothes => this.clothes = clothes.slice(0, 9));/*определяет сколько фото на главной*/
  }
}

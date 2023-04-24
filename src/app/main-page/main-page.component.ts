import { Component, OnInit } from '@angular/core';
import {Clothes} from "../entity/clothes";
import {ClothesService} from "../clothes.service";
import {UserService} from "../_services/user.service";
import {CollectionMenuComponent} from "../collection-menu/collection-menu.component";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  clothes : Clothes[] = [];

  constructor(private userService:UserService,
              private clothesService:ClothesService) { }

  ngOnInit(): void {
    this.getPublicContent();
    this.clothesService.removeCriterionsFilter();
  }

  getPublicContent(): void {
      this.userService.getPublicContent()
        .subscribe(clothes => this.clothes = clothes.slice(0, 9));/*определяет сколько фото на главной*/
  }
}

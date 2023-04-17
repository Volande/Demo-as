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
  wardrobe : Clothes[] = [];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getPublicContent();
  }

  getPublicContent(): void {


      this.userService.getPublicContent()
        .subscribe(clothes => this.wardrobe = clothes.slice(0, 9));/*определяет сколько фото на главной*/



  }
}

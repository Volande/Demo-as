import { Component, OnInit } from '@angular/core';
import {Clothes} from "../entity/clothes";
import {ClothesService} from "../clothes.service";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  wardrobe : Clothes[] = [];

  constructor(private heroService:ClothesService,private userService:UserService) { }

  ngOnInit(): void {
    this.getPublicContent();
  }

  getPublicContent(): void {
    this.userService.getPublicContent()
      .subscribe(clothes =>this.wardrobe = clothes.slice(0, 5)) ;/*определяет сколько фото на главной*/
  }
}

import { Component, OnInit } from '@angular/core';
import {Clothes} from "../clothes";
import {ClothesService} from "../clothes.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  wardrobe: Clothes[]=[];

  constructor(private heroService:ClothesService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes =>this.wardrobe = heroes.slice(0, 9));/*определяет сколько фото на главной*/
  }
}

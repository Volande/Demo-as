import { Component, OnInit } from '@angular/core';
import {Clothes} from "../clothes";
import {ClothesService} from "../clothes.service";

@Component({
  selector: 'app-relevants',
  templateUrl: './relevants.component.html',
  styleUrls: ['./relevants.component.css']
})
export class RelevantsComponent implements OnInit {
  wardrobe: Clothes[]=[];

  constructor(private heroService:ClothesService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes =>this.wardrobe = heroes.slice(0, 2));/*определяет сколько фото на главной*/
  }
}

import { Component, OnInit } from '@angular/core';
import {Clothes} from "../clothes";
import {ClothesService} from "../clothes.service";
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css']
})
export class ClothesComponent implements OnInit {
  heroes: Clothes[]=[];

  constructor(private heroService:ClothesService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes =>this.heroes = heroes.slice(0,20));/*определяет сколько фото на главной*/
  }

}

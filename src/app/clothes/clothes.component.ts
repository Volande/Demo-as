import { Component, OnInit } from '@angular/core';
import {Clothes} from "../entity/clothes";
import {ClothesService} from "../clothes.service";
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FormsModule } from '@angular/forms';
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css']
})
export class ClothesComponent implements OnInit {
  wardrobe: Clothes[];

  constructor(private clothesService:ClothesService,
              private userService : UserService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    if(this.wardrobe == null)  {
      this.userService.getPublicContent()
        .subscribe(clothes => this.wardrobe = clothes.slice(0, 9));/*определяет сколько фото на главной*/
    }else {
      this.wardrobe = this.clothesService.putClothes()
    }
  }

}

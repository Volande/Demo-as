import { Component, OnInit } from '@angular/core';
import {Clothes} from "../entity/clothes";
import {ClothesService} from "../clothes.service";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-relevants',
  templateUrl: './relevants.component.html',
  styleUrls: ['./relevants.component.css']
})
export class RelevantsComponent implements OnInit {
  clothes:  Clothes[]=[];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getPublicContent();
  }

  getPublicContent(): void {
    this.userService.getPublicContent()
      .subscribe(heroes =>this.clothes = heroes.slice(0, 4));/*определяет сколько фото на главной*/
  }
}

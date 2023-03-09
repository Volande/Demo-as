import { Component, OnInit } from '@angular/core';
import {Clothes} from "../entity/clothes";
import {ActivatedRoute} from "@angular/router";
import {ClothesService} from "../clothes.service";
import {Location} from "@angular/common";
import {UserService} from "../_services/user.service";
import {Image} from "../entity/image";




@Component({
  selector: 'app-clothes-page',
  templateUrl: './clothes-page.component.html',
  styleUrls: ['./clothes-page.component.css']
})
export class ClothesPageComponent implements OnInit {
  clothes: Clothes | undefined;
  image: Image [] = [];




  constructor (

    private route: ActivatedRoute,

    private location: Location,
    private userService:UserService,

  ) {

  }




  ngOnInit(): void {
    this.getHero();

  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getHero(id)
      .subscribe(clothes => this.clothes = clothes);
  }





  goBack(): void {
    this.location.back()
  };


}



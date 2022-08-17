import { Component, OnInit } from '@angular/core';
import {Clothes} from "../clothes";
import {ActivatedRoute} from "@angular/router";
import {ClothesService} from "../clothes.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-clothes-page',
  templateUrl: './clothes-page.component.html',
  styleUrls: ['./clothes-page.component.css']
})
export class ClothesPageComponent implements OnInit {
  clothes: Clothes | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: ClothesService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.clothes = hero);
  }

  goBack(): void {
    this.location.back()
  };

  save(): void {
    if (this.clothes) {
      this.heroService.updateHero(this.clothes)
        .subscribe(() => this.goBack());
    }
  }
}



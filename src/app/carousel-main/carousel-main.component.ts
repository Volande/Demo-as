import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Clothes} from '../clothes';
import {ClothesService} from '../clothes.service';

@Component({
  selector: 'app-carousel-main',
  templateUrl: './carousel-main.component.html',
  styleUrls: ['./carousel-main.component.css']
})
export class CarouselMainComponent implements OnInit {
  heroes: Clothes[] = [];
  constructor(private route: ActivatedRoute,
              private heroService: ClothesService,
              private location: Location) {
  }

  ngOnInit(): void {

  }
}

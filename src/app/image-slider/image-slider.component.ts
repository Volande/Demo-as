import {Component, Input, NgModule, OnDestroy, OnInit} from '@angular/core';
import {Image} from "../entities/image";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {UserService} from "../_services/user.service";
import {NgxImageZoomModule} from "ngx-image-zoom";

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})

export class ImageSliderComponent implements OnInit, OnDestroy {

  constructor (

    private route: ActivatedRoute,

    private location: Location,
    private userService:UserService,

  ) {

  }
  image: Image [] = [];

  currentIndex: number = 0;
  timeoutId?: number;
  getImage():void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getClothe(id)
      .subscribe(clothes => this.image = clothes.image);
  }

  ngOnInit(): void {
    this.getImage();
  }
  ngOnDestroy() {
    window.clearTimeout(this.timeoutId);
  }


  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.image.length - 1
      : this.currentIndex - 1;


    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.image.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;


    this.currentIndex = newIndex;
  }

  goToSlide(slideIndex: number): void {

    this.currentIndex = slideIndex;
  }

  getCurrentSlideUrl() {
    return  this.image[this.currentIndex].title;
  }
}

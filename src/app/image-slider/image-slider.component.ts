import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Image} from "../image";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {UserService} from "../_services/user.service";

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
    this.userService.getHero(id)
      .subscribe(clothes => this.image = clothes.image);
  }

  ngOnInit(): void {
    this.resetTimer();
    this.getImage();
  }
  ngOnDestroy() {
    window.clearTimeout(this.timeoutId);
  }
  resetTimer() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    this.timeoutId = window.setTimeout(() => this.goToNext(), 5000);
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.image.length - 1
      : this.currentIndex - 1;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.image.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToSlide(slideIndex: number): void {
    this.resetTimer();
    this.currentIndex = slideIndex;
  }

  getCurrentSlideUrl() {
    return `url('${this.image[this.currentIndex].title}')`;
  }
}

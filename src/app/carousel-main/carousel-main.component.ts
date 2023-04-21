import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Clothes} from '../entity/clothes';
import {ClothesService} from '../clothes.service';
import {UserService} from "../_services/user.service";
import {Image} from "../entity/image";

@Component({
  selector: 'app-carousel-main',
  templateUrl: './carousel-main.component.html',
  styleUrls: ['./carousel-main.component.css']
})
export class CarouselMainComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private location: Location,
              private userService: UserService,) {
  }

  image: string [] = ["https://shklar-images.s3.eu-central-1.amazonaws.com/carousel-main/photo1-_2_.png",
    "https://shklar-images.s3.eu-central-1.amazonaws.com/carousel-main/photo1-_3_.png",
    "https://shklar-images.s3.eu-central-1.amazonaws.com/carousel-main/photo2-_1_.png",
    "https://shklar-images.s3.eu-central-1.amazonaws.com/carousel-main/photo5+(1).png",
    "https://shklar-images.s3.eu-central-1.amazonaws.com/carousel-main/photo6.png"];

  clothes: Clothes[] = [];
  currentIndex: number = 0;
  timeoutId?: number;

  /*getImage(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getClothe(350)
      .subscribe(clothes => this.image = clothes.image);

  }*/


  ngOnInit(): void {
    this.resetTimer();


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
    return `${this.image[this.currentIndex]}`;
  }
}

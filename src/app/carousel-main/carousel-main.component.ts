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

  image: string [] = ["https://shklar-images.s3.eu-central-1.amazonaws.com/carousel-main/%D0%B2%D0%B5%D0%BB%D0%B8%D0%BA%D0%BE%D0%BB%D0%B5%D0%BF%D0%BD%D1%8B%D0%B9-%D0%B2%D0%BE%D1%81%D1%85%D0%BE%D0%B4-%D1%81%D0%BE%D0%BB%D0%BD%D1%86%D0%B0-%D0%B2-%D0%B3%D0%BE%D1%80%D0%B0%D1%85-%D1%88%D0%B8%D1%80%D0%BE%D0%BA%D0%B8%D0%B9-%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82-%D1%86%D0%B2%D0%B5%D1%82%D1%8B-%D0%BD%D0%B0-234003082.jpg",
    "https://shklar-images.s3.eu-central-1.amazonaws.com/carousel-main/%D0%BE%D0%B1%D0%BB%D0%B0%D1%87%D0%BD%D0%BE%D0%B5-%D0%BD%D0%B5%D0%B1%D0%BE-%D0%BD%D0%B0-%D1%80%D0%B0%D1%81%D1%81%D0%B2%D0%B5%D1%82%D0%B5-%D1%84%D0%BE%D0%BD-%D0%B0%D0%B1%D1%81%D1%82%D1%80%D0%B0%D0%BA%D1%82%D0%BD%D0%BE%D0%B9-%D0%BF%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D1%8B-%D0%BD%D0%B5%D0%B1%D0%B0-%D1%88%D0%B8%D1%80%D0%BE%D0%BA%D0%B8%D0%B9-%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82-232588010.jpg",
    "https://shklar-images.s3.eu-central-1.amazonaws.com/carousel-main/depositphotos_6729512-stock-photo-digital-printing-wide-format-printer.jpg",
    "https://shklar-images.s3.eu-central-1.amazonaws.com/carousel-main/panoramic-photo-of-strange-misty-forest-in-autumn-wide-format-of-dramatic-scene-landscape-in-the-autumn-forest_87555-18476.avif",
    "https://shklar-images.s3.eu-central-1.amazonaws.com/carousel-main/depositphotos_6729512-stock-photo-digital-printing-wide-format-printer.jpg"];

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

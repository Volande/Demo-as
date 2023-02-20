import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ImageSliderComponent} from "./image-slider.component";


@NgModule({
  imports: [CommonModule],
  exports: [ImageSliderComponent],
  declarations: [ImageSliderComponent],
})
export class ImageSliderModule {}

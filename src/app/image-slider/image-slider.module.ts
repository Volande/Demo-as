import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ImageSliderComponent} from "./image-slider.component";
import {PinchZoomModule} from "ngx-pinch-zoom";


@NgModule({
  imports: [CommonModule,  PinchZoomModule],
  exports: [ImageSliderComponent],
  declarations: [ImageSliderComponent],
})
export class ImageSliderModule {}

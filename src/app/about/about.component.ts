import { Component, OnInit } from '@angular/core';
import {ClothesService} from "../clothes.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private clothesService:ClothesService) {
    this.clothesService.removeCriterionsFilter();
  }

  ngOnInit(): void {
  }

}

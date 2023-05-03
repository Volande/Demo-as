import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../products.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private productsService:ProductsService) {
    this.productsService.removeCriterionsFilter();
  }

  ngOnInit(): void {
  }

}

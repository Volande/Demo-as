import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClothesService} from "./clothes.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logo = './assets/photo-dress/logo.jpg';
  title: String = 'title_name';


}

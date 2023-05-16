import {Component, NgModule, NgZone, OnInit} from '@angular/core';
import {Product} from "../entities/product";
import {ProductsService} from "../products.service";
import {UserService} from "../_services/user.service";
import {ActivatedRoute, Router, RouterModule, Routes} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-relevants',
  templateUrl: './relevants.component.html',
  styleUrls: ['./relevants.component.css']


})
export class RelevantsComponent implements OnInit {
  clothes:  Product[]=[];
  paramsSub: Subscription;

  constructor(private userService:UserService,
              private router: Router,
              private ngZone:NgZone,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPublicContent();
    const params = +this.activeRoute.snapshot.params;
  }


  getPublicContent(): void {
    this.userService.getPublicContent()
      .subscribe(heroes =>this.clothes = heroes.slice(0, 4));/*определяет сколько фото на главной*/
  }
}

import {Component, NgModule, NgZone, OnInit} from '@angular/core';
import {Product} from "../entity/product";
import {ProductsService} from "../products.service";
import {UserService} from "../_services/user.service";
import {Router, RouterModule, Routes} from "@angular/router";

@Component({
  selector: 'app-relevants',
  templateUrl: './relevants.component.html',
  styleUrls: ['./relevants.component.css']


})


export class RelevantsComponent implements OnInit {
  clothes:  Product[]=[];

  constructor(private userService:UserService,
              private router: Router,
              private ngZone:NgZone,) { }

  ngOnInit(): void {
    this.getPublicContent();
  }
  redirect(to:number) {
    // call with ngZone, so that ngOnOnit of component is called
    this.ngZone.run(()=>this.router.navigate([to]));
  }

  getPublicContent(): void {
    this.userService.getPublicContent()
      .subscribe(heroes =>this.clothes = heroes.slice(0, 4));/*определяет сколько фото на главной*/
  }
}

import {Component, NgModule, NgZone, OnInit} from '@angular/core';
import {Product} from "../entities/product";
import {ProductsService} from "../products.service";
import {UserService} from "../_services/user.service";
import {ActivatedRoute, Router, RouterModule, Routes} from "@angular/router";
import {Subscription} from "rxjs";
import {LangChangedEvent, TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-relevants',
  templateUrl: './relevants.component.html',
  styleUrls: ['./relevants.component.css']


})
export class RelevantsComponent implements OnInit {
  clothes:  Product[]=[];
  index:number;

  constructor(private userService:UserService,
              private router: Router,
              private ngZone:NgZone,
              private activeRoute: ActivatedRoute,
              private translocoService:TranslocoService) { }

  ngOnInit(): void {
    this.getPublicContent();
    // @ts-ignore
    this.translocoService.langChanges$.subscribe((event: LangChangedEvent) =>
    {
      // @ts-ignore
      this.index = ['uk', 'en'].indexOf(event);
    });
  }


  getPublicContent(): void {
    this.userService.getPublicContent()
      .subscribe(clothes =>this.clothes = clothes.slice(0, 4));/*определяет сколько фото на главной*/
  }
}

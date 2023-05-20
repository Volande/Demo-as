import {Component, Inject, OnInit} from '@angular/core';
import {Product} from "../entities/product";
import {ProductsService} from "../products.service";
import {UserService} from "../_services/user.service";
import {LangChangedEvent, TranslocoService} from "@ngneat/transloco";
import {ProductInformation} from "../entities/product-information";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  clothes : Product[] = [];
  clothesLanguage:Product[] = [];
  language: string ;
  index:number;

  constructor(private userService:UserService,
              private productsService:ProductsService,
              private translocoService: TranslocoService) { }

  ngOnInit(): void {

    this.productsService.removeCriterionsFilter();


    this.getPublicContent()

    // @ts-ignore
    this.translocoService.langChanges$.subscribe((event: LangChangedEvent) =>
    {
      // @ts-ignore
      this.index = ['uk', 'en'].indexOf(event);
    });

  }



  getPublicContent(): void {
      this.userService.getPublicContent()
        .subscribe(clothes => this.clothes = clothes.slice(0, 9));/*определяет сколько фото на главной*/

  }
}

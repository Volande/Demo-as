import {ChangeDetectorRef, Component, Inject, Injectable, OnInit, Optional} from '@angular/core';
import {Product} from "../entities/product";
import {ProductsService} from "../products.service";
import {FilterPipeModule} from 'ngx-filter-pipe';
import {FormBuilder, FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {UserService} from "../_services/user.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {Categories} from "../entities/categories";
import {Availability} from "../entities/availability";
import {LangChangedEvent, TranslocoService} from "@ngneat/transloco";
import {Collection} from "../entities/collection";

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-clothes',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  clothes: Product[];
  categories: Categories[] = [];
  categoryNames:string[]=[];

  availabilities: Availability[] = [];
  collection: Collection[] = [];
  sizes: string[] = [];
  searchByCollection: string;

  collectionFilter: string[] = [];
  reactiveForm: FormGroup;
  index:number;


  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: { clothes: Product },
              private productsService: ProductsService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private translocoService:TranslocoService

  ) {
    this.reactiveForm = this.formBuilder.group({

      availability: [''],
      priceMin: [''],
      priceMax: [''],
      sizes: [[]],
      collectionFilter: [[]],
      categories: [[]],


    })
  }

  ngOnInit(): void {
    this.getPublicContent();
    this.getCollection();
    this.getCategories();
    this.getAvailability();
    this.getSizes();
    this.initForm();
    this.initFormByCollection();
    this.searchProductByCollection();
    this.onSubmit();

    // @ts-ignore
    this.translocoService.langChanges$.subscribe((event: LangChangedEvent) =>
    {
      // @ts-ignore
      this.index = ['uk', 'en'].indexOf(event);
    });
  }

  getCollection(): void {
    this.userService.getCollection()
      .subscribe(collection => {
        collection.forEach((element) => {
          this.collection.push(element)
        })
      });

  }

  getCategories(): void {
    this.userService.getCategories()
      .subscribe(categories => {
        categories.forEach((element) => {
         this.categories.push(element);
        })
      });
  }
  getAvailability():void{
    this.userService.getAvailability().subscribe(availability=>{
      availability.forEach((element)=>{
        this.availabilities.push(element)
      })
    })
  }

  getSizes(): void {
    this.userService.getSizes()
      .subscribe(sizes => {
        sizes.forEach((element) => {
          this.sizes.push(element.title)
        })
      });
  }


  getPublicContent(): void {

    this.userService.getPublicContent()
      .subscribe(clothes => this.clothes = clothes);/*определяет сколько фото на главной*/

  }


  initForm() {



   if ( localStorage.getItem('criterionsFilter')) {
      let criterionsFilter: any = JSON.parse(localStorage.getItem('criterionsFilter') || '{}');
      if (criterionsFilter != '{}') {


        this.reactiveForm.patchValue({
          availability: criterionsFilter.availability,
          priceMin: criterionsFilter.priceMin,
          priceMax: criterionsFilter.priceMax,
          sizes: criterionsFilter.sizes,
          collectionFilter: criterionsFilter.collection,
          categories: criterionsFilter.categories
        });

      }
    }
  }

  initFormByCollection(): void {



      const s1 = JSON.parse(window.sessionStorage.getItem("collection") || '{}');

      if (s1 != null) {
        this.searchByCollection = s1;

        const collection = [];
        collection.push(s1)
        this.reactiveForm.patchValue({
          collectionFilter: collection
        });

        window.sessionStorage.removeItem("collection")

    }

  }


  searchProductByCollection() {
    if (this.searchByCollection != undefined) {
      this.productsService.findProduct(
        this.reactiveForm.value.availability,
        this.reactiveForm.value.priceMin,
        this.reactiveForm.value.priceMax,
        this.reactiveForm.value.sizes,
        this.reactiveForm.value.collectionFilter,
        this.reactiveForm.value.categories,
      ).subscribe((response: Product[]) => {
          this.clothes = response;
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  saveCriterionsFilter() {
    let criterionsFilter: any = JSON.stringify({
      availability: this.reactiveForm.value.availability,
      priceMin: this.reactiveForm.value.priceMin,
      priceMax: this.reactiveForm.value.priceMax,
      sizes: this.reactiveForm.value.sizes,
      categories: this.reactiveForm.value.categories,
      collectionFilter: this.reactiveForm.value.collectionFilter,
    });
    localStorage.setItem('criterionsFilter', criterionsFilter);
  }

  onSubmit() {

    this.productsService.findProduct(
      this.reactiveForm.value.availability,
      this.reactiveForm.value.priceMin,
      this.reactiveForm.value.priceMax,
      this.reactiveForm.value.sizes,
      this.reactiveForm.value.collectionFilter,
      this.reactiveForm.value.categories,
    ).subscribe((response: Product[]) => {
        this.clothes = response;
      },
      (error) => {
        console.log(error);
      }
    )
    this.saveCriterionsFilter();

  }


  resetSettings(){
    localStorage.removeItem("criterionsFilter")
    window.location.reload()
  }

}

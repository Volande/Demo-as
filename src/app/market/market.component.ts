import {ChangeDetectorRef, Component, Inject, Injectable, OnInit, Optional} from '@angular/core';
import {Clothes} from "../entity/clothes";
import {ClothesService} from "../clothes.service";
import {FilterPipeModule} from 'ngx-filter-pipe';
import {FormBuilder, FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {UserService} from "../_services/user.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-clothes',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  wardrobe: Clothes[];
  categories: string[] = [];
  availability: boolean[] = [true, false];
  collection: string[] = [];
  sizes: string[] = [];
  searchByCollection: string;


  reactiveForm: FormGroup;


  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: { clothes: Clothes },
              private clothesService: ClothesService,
              private userService: UserService,
              private formBuilder: FormBuilder,
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
    this.getSizes();
    this.initForm()
  }

  getCollection(): void {
    this.userService.getCollection()
      .subscribe(collection => {
        collection.forEach((element) => {
          this.collection.push(element.title)
        })
      });
  }

  getCategories(): void {
    this.userService.getCategories()
      .subscribe(categories => {
        categories.forEach((element) => {
          this.categories.push(element.title)
        })
      });
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
      .subscribe(clothes => this.wardrobe = clothes);/*определяет сколько фото на главной*/

  }

  initForm(): void {


    const s1 = window.sessionStorage.getItem("collection");
    if (s1 != null) {
      this.searchByCollection = s1;
    }

    this.reactiveForm.patchValue({

      collectionFilter: this.searchByCollection
    });


  }

  searchProduct(s: string) {
    const s1 = window.sessionStorage.getItem("collection");
    if (s1 != null) {
      this.searchByCollection = s1;
    }
  }

  onSubmit() {


    this.clothesService.findProduct(
      this.reactiveForm.value.availability,
      this.reactiveForm.value.priceMin,
      this.reactiveForm.value.priceMax,
      this.reactiveForm.value.sizes,
      this.reactiveForm.value.collectionFilter,
      this.reactiveForm.value.categories,
    ).subscribe((response: Clothes[]) => {
        this.wardrobe = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

}

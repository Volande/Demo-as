import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClothesService} from "../clothes.service";
import {Clothes} from "../entity/clothes";
import {UserService} from "../_services/user.service";
import {Categories} from "../entity/categories";
import {Collection} from "../entity/collection";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {


  reactiveForm: FormGroup;

  titleMaxLength = 30;
  contentMaxLength = 400;
  compoundMaxLength = 300;

  availability: string[] = ["true", "false"]

  categories: Categories[] = [];

  collection: Collection[] = [];

  ngOnInit(): void {
    this.getCategories();
    this.getCollection();

  }

  getCollection(): void {
    this.userService.getCollection()
      .subscribe(collection => this.collection = collection);
  }

  getCategories(): void {
    this.userService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { clothes: Clothes | null },
    private formBuilder: FormBuilder,
    public clothesService: ClothesService,
    public dialog: MatDialog,
    private userService: UserService,
  ) {

    this.reactiveForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(this.titleMaxLength)]],
      content: ['', [Validators.required, Validators.maxLength(this.contentMaxLength)]],
      compound: ['', [Validators.required, Validators.maxLength(this.compoundMaxLength)]],
      availability: ['', []],
      price: [''],
      sizes: [''],
      collection: [[]],
      categories: ['',[]],
      newCategory: [''],
      newCollection: [''],
    })
  }


  initForm(): void {
    if (this.data.clothes) {
      this.reactiveForm.patchValue({
        title: this.data.clothes.title,
        content: this.data.clothes.content,
        compound: this.data.clothes.compound,
        price: this.data.clothes.price,
        availability: this.data.clothes.availability,
        sizes: this.data.clothes.size,
        collection: this.data.clothes.collection,

      });
    }
  }

  onSubmit() {

    const controls = this.reactiveForm.controls;

    /** Проверяем форму на валидность */
    if (this.reactiveForm.invalid/* ||

      (this.reactiveForm.value.image == undefined && !this.data.car) ||
      (this.reactiveForm.value.image._fileNames != undefined &&
        (!this.image.name.endsWith('jpg') &&
          !this.image.name.endsWith('png') &&
          !this.image.name.endsWith('jpeg')))
*/) {

      /** Если форма не валидна, то помечаем все контролы как touched*/
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      /** Прерываем выполнение метода*/
      return;
    }


    this.clothesService.putClothe(
      this.reactiveForm.value.title,
      this.reactiveForm.value.content,
      this.reactiveForm.value.compound,
      this.reactiveForm.value.price,
      this.reactiveForm.value.availability,
      this.reactiveForm.value.sizes.split(','),
      (this.reactiveForm.value.categories.title || '').split(','),
      this.reactiveForm.value.newCategory.split(','),
      this.reactiveForm.value.collection.title,
      this.reactiveForm.value.newCollection,
    ).subscribe(() => {
      this.dialog.closeAll()
    });

  }
}

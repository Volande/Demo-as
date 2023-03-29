import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ClothesService} from "../clothes.service";
import {Clothes} from "../entity/clothes";
import {UserService} from "../_services/user.service";
import {Categories} from "../entity/categories";
import {Collection} from "../entity/collection";
import {FileValidator} from "ngx-material-file-input";
import {Size} from "../entity/size";
import {Observable} from "rxjs";

export function requiredExtension(expectedExtensions: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      let fileName = control.value.files[0].name;
      let forbidden = true;

      console.log(expectedExtensions[0]);

      for (let extension of expectedExtensions) {
        if (fileName.endsWith(extension)) {
          forbidden = false;
        }
      }

      return forbidden ? {wrongExtension: {value: control.value}} : null;
    }
    return null;
  }
}

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
  readonly maxSize = 1_048_576;

  availability: string[] = ["true", "false"]

  categories: string[] = [];


  productCategories: string[] = [];
  collection: Collection[] = [];

  sizes: Size[] = [];
  images: File[] = [];


  ngOnInit(): void {


    this.getCategories();
    if (this.data) {
      if (this.data.clothes) {
        this.data.clothes.categories.forEach((element) => {
          this.productCategories.push(element.title)
        })
      }
    }
    this.getCollection();
    this.getSizes();
    this.initForm();


  }

  getCollection(): void {
    this.userService.getCollection()
      .subscribe(collection => this.collection = collection);
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
      .subscribe(sizes => this.sizes = sizes);
  }


  result: any;

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];


  selectFile(event: any) {
    this.images = event.target.files;
    for (let i = 0; i < event.target.files; i++) {
      this.images.push(event.target.files[i]);
    }
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
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
      availability: [[]],
      price: [''],
      sizes: [[]],
      collection: [[]],
      categories: [[]],
      images: new FormControl('', [
        Validators.required,
        FileValidator.maxContentSize(this.maxSize),
        requiredExtension(['png', 'jpg', 'jpeg'])
      ]),

    })
  }


  initForm(): void {
    if (this.data.clothes) {
      this.reactiveForm.patchValue({

        title: this.data.clothes.title,
        content: this.data.clothes.content,
        compound: this.data.clothes.compound,
        price: this.data.clothes.price,
        availability: this.data.clothes.availability.toString(),
        sizes: this.data.clothes.size.reduce((sizes, value, index) => {
          if (index > 0)
            sizes += ', ';
          return sizes + value.title;
        }, ''),
        collection: {id: this.data.clothes.collection.id},
        categories: this.productCategories,

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


    this.clothesService.saveClothe(
      this.reactiveForm.value.title,
      this.reactiveForm.value.content,
      this.reactiveForm.value.compound,
      this.reactiveForm.value.price,
      this.reactiveForm.value.availability,
      this.reactiveForm.value.sizes,
      this.reactiveForm.value.categories,
      this.reactiveForm.value.collection.title,
      this.images
    ).subscribe(() => {
      this.dialog.closeAll()
    });

  }
}

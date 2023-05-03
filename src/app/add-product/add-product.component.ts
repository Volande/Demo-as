import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray, CdkDrag} from '@angular/cdk/drag-drop';
import {
  FormBuilder,
  FormControl,
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ProductsService} from "../products.service";
import {Product} from "../entity/product";
import {UserService} from "../_services/user.service";
import {FileValidator} from "ngx-material-file-input";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  availability: string[] = ["Є в наявності", "Немає"]

  categories: string[] = [];
  productCategories: string[] = [];
  productCollection: string[] = [];
  collection: string[] = [];
  sizes: string[] = [];
  productSizes: string[] = [];
  images: File[] = [];

  productImages: string[]=[];


  ngOnInit(): void {

    if (this.data) {
      if (this.data.clothes) {
        this.data.clothes.image.forEach((element) => {
          this.productImages.push(element.title)
        })
      }
    }
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

    if (this.data) {
      if (this.data.clothes) {
        this.data.clothes.size.forEach((element) => {
          this.productSizes.push(element.title)
        })
      }
    }


    this.initForm();


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


  result: any;

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  spinnerFalse: boolean = false;


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


  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data.clothes.image, event.previousIndex, event.currentIndex);
  }


  delete(index: any) {
    this.data.clothes.image.splice(index,1);
  }




  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { clothes: Product  },
    private formBuilder: FormBuilder,
    public productsService: ProductsService,
    public dialog: MatDialog,
    private userService: UserService,
    private _snackBar:MatSnackBar
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
        availability: this.data.clothes.availability,
        sizes: this.productSizes,
        collection: this.data.clothes.collection.title,
        categories: this.productCategories,
        previews: this.productImages

      });


    }
  }


  onSubmit() {


   if(this.data) {
      this.productsService.updateClothe(
        this.data.clothes.id,
        this.reactiveForm.value.title,
        this.reactiveForm.value.content,
        this.reactiveForm.value.compound,
        this.reactiveForm.value.price,
        this.reactiveForm.value.availability,
        this.reactiveForm.value.sizes,
        this.reactiveForm.value.categories,
        this.reactiveForm.value.collection,
        this.data.clothes.image,
        this.images
      ).subscribe(() => {
        this.dialog.closeAll()
        this._snackBar.open("Товар змінено успішно", "Закрити");
      });
    }else {

     this.productsService.saveClothe(
       this.reactiveForm.value.title,
       this.reactiveForm.value.content,
       this.reactiveForm.value.compound,
       this.reactiveForm.value.price,
       this.reactiveForm.value.availability,
       this.reactiveForm.value.sizes,
       this.reactiveForm.value.categories,
       this.reactiveForm.value.collection,
       this.images
     ).subscribe(() => {
       this.dialog.closeAll()
       this._snackBar.open("Товар додано успішно", "Закрити");
     });
   }


  }

}

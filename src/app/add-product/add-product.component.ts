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
import {Product} from "../entities/product";
import {UserService} from "../_services/user.service";
import {FileValidator} from "ngx-material-file-input";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LangChangedEvent, TranslocoService} from "@ngneat/transloco";
import {Categories} from "../entities/categories";
import {Collection} from "../entities/collection";
import {Availability} from "../entities/availability";

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

  title_UA_MaxLength = 30;
  content_UA_MaxLength = 400;
  compound_UA_MaxLength = 300;
  title_EN_MaxLength = 30;
  content_EN_MaxLength = 400;
  compound_EN_MaxLength = 300;
  readonly maxSize = 1_048_576;

  availability: string[] = ["Є в наявності", "Немає"]

  categories: string[] = [];
  productCategories: string[] = [];
  productCollection: string[] = [];
  collection: Collection[] = [];
  availabilities: Availability[] = [];
  sizes: string[] = [];
  productSizes: string[] = [];
  images: File[] = [];

  productImages: string[]=[];
  productAvailability:string;
  index :number

  ngOnInit(): void {
    // @ts-ignore
    this.translocoService.langChanges$.subscribe((event: LangChangedEvent) =>

    {
      // @ts-ignore
      this.index = ['uk', 'en'].indexOf(event);
    });

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
          this.productCategories.push(element.categoryNames[this.index].title)
        })
      }
    }

    this.getCollection();
    this.getAvailability();


    this.getSizes();

    if (this.data) {
      if (this.data.clothes) {
        this.data.clothes.size.forEach((element) => {
          this.productSizes.push(element.title)
        })
      }
    }

    if (this.data) {
      if (this.data.clothes) {
       this.productAvailability = this.data.clothes.availability.availabilityNames[this.index].title;
      }
    }



    this.initForm();


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
          this.categories.push(element.categoryNames[this.index].title)
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
    private _snackBar:MatSnackBar,
    private translocoService: TranslocoService,
  ) {

      this.reactiveForm = this.formBuilder.group({
        title_UA: ['', [Validators.required, Validators.maxLength(this.title_UA_MaxLength)]],
        content_UA: ['', [Validators.required, Validators.maxLength(this.content_UA_MaxLength)]],
        compound_UA: ['', [Validators.required, Validators.maxLength(this.compound_UA_MaxLength)]],
        title_EN: ['', [Validators.required, Validators.maxLength(this.title_EN_MaxLength)]],
        content_EN: ['', [Validators.required, Validators.maxLength(this.content_EN_MaxLength)]],
        compound_EN: ['', [Validators.required, Validators.maxLength(this.compound_EN_MaxLength)]],
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
        title_UA: this.data.clothes.productInformation[0].title,
        content_UA: this.data.clothes.productInformation[0].content,
        compound_UA: this.data.clothes.productInformation[0].compound,
        title_EN: this.data.clothes.productInformation[1].title,
        content_EN: this.data.clothes.productInformation[1].content,
        compound_EN: this.data.clothes.productInformation[1].compound,
        price:this.data.clothes.price,
        sizes: this.productSizes,
        availability:this.data.clothes.availability.availabilityNames[this.index].title,
        collection:this.data.clothes.collection.collectionNames[this.index].title,

        categories:this.productCategories,
        previews: this.productImages

      });


    }
  }


  onSubmit() {


   if(this.data) {
      this.productsService.updateClothe(
        this.data.clothes.id,
        this.data.clothes.productInformation[0].id,
        this.reactiveForm.value.title_UA,
        this.reactiveForm.value.content_UA,
        this.reactiveForm.value.compound_UA,
        this.data.clothes.productInformation[1].id,
        this.reactiveForm.value.title_EN,
        this.reactiveForm.value.content_EN,
        this.reactiveForm.value.compound_EN,
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
       this.reactiveForm.value.title_UA,
       this.reactiveForm.value.content_UA,
       this.reactiveForm.value.compound_UA,
       this.reactiveForm.value.title_EN,
       this.reactiveForm.value.content_EN,
       this.reactiveForm.value.compound_EN,
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

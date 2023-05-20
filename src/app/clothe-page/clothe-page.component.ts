import {Component, EventEmitter, Injectable, OnChanges, OnInit, Output, Renderer2, SimpleChanges} from '@angular/core';
import {Product} from "../entities/product";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../products.service";
import {Location} from "@angular/common";
import {UserService} from "../_services/user.service";
import {Image} from "../entities/image";
import {TokenStorageService} from "../_services/token-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {AddProductComponent} from "../add-product/add-product.component";
import {ConfirmationDeleteProductComponent} from "../confirmation-delete-product/confirmation-delete-product.component";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Size} from "../entities/size";
import {Product_dto} from "../entities/product_dto";
import {LangChangedEvent, TranslocoService} from "@ngneat/transloco";
import {TranslocoHttpLoader, TranslocoRootModule} from "../transloco-root.module";
import {Translate2Service} from "../translate2.service";


@Component({
  selector: 'app-clothe-page',
  templateUrl: './clothe-page.component.html',
  styleUrls: ['./clothe-page.component.css']
})

export class ClothePageComponent implements OnInit,OnChanges {
  clothes: Product;
  image: Image [] = [];

  availabilityClothe: string;

  isLoggedIn = false;
  showAdminBoard = false;

  username?: string;

  private role: string = "UnAuthorized";

  reactiveForm: FormGroup;
  size: Size = new class implements Size {
    id: number;
    title: string;
  };

  sizeClothe: Size[] = [];
  fontStyleControl = new FormControl(this.size);
  fontStyle?: string;

  quantity: number;
  private productNew: Product;
  index :number;
  language: string ;

  private nullArray:Size[] = []
  constructor(
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private productsService: ProductsService,
    public dialog: MatDialog,
    public overlay: Overlay,
    private router: Router,
    private formBuilder: FormBuilder,

    private translocoService: TranslocoService,

    private _renderer: Renderer2,



  ) {
    const user = this.tokenStorageService.getUser();
    this.isLoggedIn = (user != null);
    if (user) {
      this.role = user.role;
      this.showAdminBoard = this.role.includes('ADMIN');
      this.username = user.username;
    }
  }


  addProductToCart(clothes:Product) {
    if (this.fontStyleControl.value) {
      this.sizeClothe.push(this.fontStyleControl.value)



      let criterionsFilter: any = JSON.parse(JSON.stringify(clothes));
      criterionsFilter.size = Object.assign({},this.sizeClothe)


      this.sizeClothe = Object.assign([],this.nullArray)
      this.productsService.event.emit( criterionsFilter)
    }

  }




  ngOnInit(): void {
    this.getClothe();
    // @ts-ignore
    this.translocoService.langChanges$.subscribe((event: LangChangedEvent) =>

    {
      // @ts-ignore
      this.index = ['uk', 'en'].indexOf(event);
    });
  }


  getClothe(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getClothe(id)
      .subscribe(clothes => this.clothes = clothes);
  }
  changeLanguage(languageCode:string):void{
    this.index = ['uk','en'].indexOf(languageCode)

  }

  changeClothesBtn(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: {clothes: this.clothes},
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '70%',
      height: '72%'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getClothe();
    });
  }


  deleteClothesBtn(clothes: Product): void {
    const dialogRef = this.dialog.open(ConfirmationDeleteProductComponent,
      {
        data: {clothes: clothes},
        scrollStrategy: this.overlay.scrollStrategies.noop(),
      });


  }

  ngOnChanges(changes: SimpleChanges): void {
    this.language = this.translocoService.getActiveLang()
    if(this.language == "uk"){
      this.index = 0;
    }else {
      this.index = 1
    }
  }


}



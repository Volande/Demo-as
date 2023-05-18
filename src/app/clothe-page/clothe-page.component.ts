import {Component, EventEmitter, OnInit, Output, Renderer2} from '@angular/core';
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
import {TranslocoService} from "@ngneat/transloco";


@Component({
  selector: 'app-clothe-page',
  templateUrl: './clothe-page.component.html',
  styleUrls: ['./clothe-page.component.css']
})
export class ClothePageComponent implements OnInit {
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
  index:number;
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
    private _renderer: Renderer2


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
    this.language = this.translocoService.getDefaultLang();
    if(this.language == "uk"){
      this.index = 0;
    }else {
      this.index = 1
    }
  }


  getClothe(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getClothe(id)
      .subscribe(clothes => this.clothes = clothes);
  }
  changeLanguage(languageCode:string):void{
    const messageDom = this._renderer.selectRootElement('#message');
    this.language = languageCode;
    if(this.language == "uk"){
      this.index = 0;
      messageDom.innerHTML = '<h2> <i class="fa fa-heart text-danger fa-3x"></i> hola berita mosa</h2>';
    }else {
      this.index = 1;
      messageDom.innerHTML = '<i class="fa fa-check-circle text-success p-1" aria-hidden="true"></i> good';
    }
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


}



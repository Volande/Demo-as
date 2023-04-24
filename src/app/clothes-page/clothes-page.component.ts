import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Clothes} from "../entity/clothes";
import {ActivatedRoute, Router} from "@angular/router";
import {ClothesService} from "../clothes.service";
import {Location} from "@angular/common";
import {UserService} from "../_services/user.service";
import {Image} from "../entity/image";
import {TokenStorageService} from "../_services/token-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {AddProductComponent} from "../add-product/add-product.component";
import {ConfirmationDeleteProductComponent} from "../confirmation-delete-product/confirmation-delete-product.component";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-clothes-page',
  templateUrl: './clothes-page.component.html',
  styleUrls: ['./clothes-page.component.css']
})
export class ClothesPageComponent implements OnInit {
  clothes: Clothes ;
  image: Image [] = [];

  availabilityClothe: string;

  isLoggedIn = false;
  showAdminBoard = false;

  username?: string;

  private role: string = "UnAuthorized";

  reactiveForm: FormGroup;

  fontStyleControl = new FormControl('');
  fontStyle?: string;
  size:string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private clothesService: ClothesService,
    public dialog: MatDialog,
    public overlay: Overlay,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    const user = this.tokenStorageService.getUser();
    this.isLoggedIn = (user != null);

    if (user) {
      this.role = user.role;

      this.showAdminBoard = this.role.includes('ADMIN');
      this.username = user.username;

    }


    this.reactiveForm = this.formBuilder.group({

      size: [''],


    })
  }



  addProductToCart(product: Clothes) {
    if(this.fontStyleControl.value){
      this.size = this.fontStyleControl.value
    }
    this.clothesService.event.emit(product)
    this.clothesService.eventSize.emit(this.size)
  }
  ngOnInit(): void {
    this.getClothe();


  }



  getClothe(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getClothe(id)
      .subscribe(clothes => this.clothes = clothes);
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


  deleteClothesBtn(clothes: Clothes): void {
    const dialogRef = this.dialog.open(ConfirmationDeleteProductComponent,
      {
        data: {clothes: clothes},
        scrollStrategy: this.overlay.scrollStrategies.noop(),
      });

    dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl("", {skipLocationChange: true}))
  }



}



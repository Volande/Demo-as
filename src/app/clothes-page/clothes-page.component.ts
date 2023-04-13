import {Component, OnInit} from '@angular/core';
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


@Component({
  selector: 'app-clothes-page',
  templateUrl: './clothes-page.component.html',
  styleUrls: ['./clothes-page.component.css']
})
export class ClothesPageComponent implements OnInit {
  clothes: Clothes | undefined;
  image: Image [] = [];

  isLoggedIn = false;
  showAdminBoard = false;

  username?: string;

  private role: string = "UnAuthorized";

  constructor(
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    public dialog: MatDialog,
    public overlay: Overlay,
    private router: Router,
  ) {
    const user = this.tokenStorageService.getUser();
    this.isLoggedIn = (user != null);

    if (user) {
      this.role = user.role;

      this.showAdminBoard = this.role.includes('ADMIN');
      this.username = user.username;

    }
  }


  ngOnInit(): void {
    this.getHero();

  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getHero(id)
      .subscribe(clothes => this.clothes = clothes);
  }

  changeClothesBtn(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: {clothes: this.clothes},
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      width:'70%',
      height:'72%'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getHero();
    });
  }



  deleteClothesBtn(clothes: Clothes): void {
    const dialogRef = this.dialog.open(ConfirmationDeleteProductComponent,
      {
        data: {clothes: clothes},
        scrollStrategy: this.overlay.scrollStrategies.noop(),
      });

    dialogRef.afterClosed().subscribe(()=>this.router.navigateByUrl("", { skipLocationChange: true }))
  }


}



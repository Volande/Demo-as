import {Component, Optional, ViewEncapsulation} from '@angular/core';
import {TokenStorageService} from "./_services/token-storage.service";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {AddProductComponent} from "./add-product/add-product.component";

import {PopupFormLoginComponent} from "./popup-form-login/popup-form-login.component";
import {PopupFormSingupComponent} from "./popup-form-singup/popup-form-singup.component";
import {Clothes} from "./entity/clothes";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  logo = './assets/photo-dress/logo.jpg';
  title: String = 'title_name';

  private role: string = "UnAuthorized";

  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  public isMenuOpen: boolean = false;

  cartProductList : Clothes [];

  constructor(private tokenStorageService: TokenStorageService,
              public dialog: MatDialog,

              @Optional() public dialogPopupLogin: MatDialogRef<PopupFormLoginComponent>,
              @Optional() public dialogPopupSingUp: MatDialogRef<PopupFormSingupComponent>,
              public overlay: Overlay,
              ) { }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.isLoggedIn = (user != null);

    if (user) {
      this.role = user.role;

      this.showAdminBoard = this.role.includes('ADMIN');
      this.showModeratorBoard = this.role.includes('ROLE_MODERATOR');

      this.username = user.username;

    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  openLoginMobile():void{
    window.location.assign("http://localhost:4200/shop/login");
  }

  openSingUpMobile():void{
    window.location.assign("http://localhost:4200/shop/register");
  }


  openLoginDialog():void{
    this.dialogPopupLogin=this.dialog.open((PopupFormLoginComponent),{
    });
  }

  openSingUpDialog(){
   this.dialogPopupSingUp = this.dialog.open((PopupFormSingupComponent),{

    });
  }

  openDialog() {
     this.dialog.open((AddProductComponent),{
       width:'70%',
       height:'72%'
    });

  }
  public onSidenavClick(): void {
    this.isMenuOpen = false;
  }

}

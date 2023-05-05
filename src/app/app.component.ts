import {Component, Optional, ViewEncapsulation} from '@angular/core';
import {TokenStorageService} from "./_services/token-storage.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddProductComponent} from "./add-product/add-product.component";
import {PopupFormLoginComponent} from "./popup-form-login/popup-form-login.component";
import {PopupFormSingupComponent} from "./popup-form-singup/popup-form-singup.component";
import {CheckingAuthService} from "./_services/checking-auth.service";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../environments/environment";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  title: String = 'title_name';

  private role: string = "UnAuthorized";

  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  quantitySelectedProduct: number;


  constructor(private tokenStorageService: TokenStorageService,
              private checkinAuth: CheckingAuthService,
              public dialog: MatDialog,
              @Optional() public dialogPopupLogin: MatDialogRef<PopupFormLoginComponent>,
              @Optional() public dialogPopupSingUp: MatDialogRef<PopupFormSingupComponent>,
              private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.checkinAuth.isLoggedIn;
    this.showAdminBoard = this.checkinAuth.showAdminBoard;
    this.showModeratorBoard = this.checkinAuth.showModeratorBoard;
    this.username = this.checkinAuth.username
    this.role = this.checkinAuth.role;
    this.translateService.use(environment.defaultLocale);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  openLoginDialog(): void {
    this.dialogPopupLogin = this.dialog.open((PopupFormLoginComponent), {});
  }

  openSingUpDialog() {
    this.dialogPopupSingUp = this.dialog.open((PopupFormSingupComponent), {});
  }

  openDialog() {
    this.dialog.open((AddProductComponent), {
      width: '70%',
      height: '72%'
    });

  }


}

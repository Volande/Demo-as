import { Component } from '@angular/core';
import {TokenStorageService} from "./_services/token-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {AddProductComponent} from "./add-product/add-product.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logo = './assets/photo-dress/logo.jpg';
  title: String = 'title_name';

  private role: string = "UnAuthorized";

  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService,
              public dialog: MatDialog,
              public overlay: Overlay,) { }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.isLoggedIn = (user != null);

    if (user) {
      this.role = user.role;

      this.showAdminBoard = this.role.includes('ADMIN');
      this.showModeratorBoard = this.role.includes('ROLE_MODERATOR');

      this.username = user.username;
      this.addCarBtn();
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  addCarBtn(): void {
    this.addCar();

  }

  addCar(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: {car: null},
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });


}}

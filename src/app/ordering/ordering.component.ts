import {Component, OnInit} from '@angular/core';
import {Product} from "../entities/product";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FileValidator} from "ngx-material-file-input";
import {requiredExtension} from "../add-product/add-product.component";
import {UserService} from "../_services/user.service";
import {ProductsService} from "../products.service";
import {CheckingAuthService} from "../_services/checking-auth.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.css'],

})
export class OrderingComponent implements OnInit {
  cartClothes: Product[] = []
  reactiveForm: FormGroup
  isLoggedIn = false;
  errorMessage: string = "";
  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this.reactiveForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      postOffice: [''],
      departmentPostOffice: [''],
      numberPhone: ['']

    })
  }

  ngOnInit(): void {
    this.selectedClothes();
  }

  selectedClothes() {
    if (localStorage.getItem("selectedClothes")) {
      this.cartClothes = JSON.parse(localStorage.getItem("selectedClothes") || '{}')
    }
  }

  replacePageAndCleaningBasket(): void {
    localStorage.removeItem("selectedClothes")
    window.location.replace("/shop/main-page");
  }
  orderClothes() {
    this.userService.orderClothes(
        this.reactiveForm.value.firstName,
        this.reactiveForm.value.lastName,
        this.reactiveForm.value.postOffice,
        this.reactiveForm.value.departmentPostOffice,
        this.reactiveForm.value.numberPhone,
        this.cartClothes
      ).subscribe(
        this.replacePageAndCleaningBasket
      )

  }

}

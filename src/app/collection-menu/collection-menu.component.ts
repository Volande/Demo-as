import {Component, OnInit} from '@angular/core';
import {UserService} from "../_services/user.service";
import {Collection} from "../entity/collection";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClothesService} from "../clothes.service";
import {Clothes} from "../entity/clothes";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ClothesPageComponent} from "../clothes-page/clothes-page.component";

@Component({
  selector: 'app-collection-menu',
  templateUrl: './collection-menu.component.html',
  styleUrls: ['./collection-menu.component.css']
})
export class CollectionMenuComponent implements OnInit {
  collection: Collection[] = [];

  clothes: Clothes[];

  constructor(private userService: UserService,
              public clothesService: ClothesService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,) {
  }


  ngOnInit(): void {
    this.getCollection()
  }

  getCollection(): void {
    this.userService.getCollection()
      .subscribe(collection => this.collection = collection);
  }






}

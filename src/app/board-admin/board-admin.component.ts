import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {Categories} from "../entity/categories";
import {Collection} from "../entity/collection";
import {Size} from "../entity/size";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ClothesService} from "../clothes.service";
import {MatDialog} from "@angular/material/dialog";
import {Customer} from "../entity/customer";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})


export class BoardAdminComponent implements OnInit {
  reactiveFormSize: FormGroup;
  reactiveFormCategory: FormGroup;

  reactiveFormCollection:FormGroup;
  sizesMaxLength = 30;
  categories: Categories[] = [];
  collection: Collection[] = [];
  sizes: Size[] = [];
  displayedColumnsNew: string[] = ['id', 'title'];

  orders: Customer[]=[];

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              public clothesService: ClothesService,
              public dialog: MatDialog,) {
    this.reactiveFormSize = this.formBuilder.group({
      sizes: ['']
    })

    this.reactiveFormCategory = this.formBuilder.group({
      category:['']
    })

    this.reactiveFormCollection= this.formBuilder.group({
      collection:['']
    })
  }


  ngOnInit()
    :
    void {
    this.getCategories();
    this.getCollection();
    this.getSizes();
    this.getAllOrder();
  }

  getSizes()
    :
    void {
    this.userService.getSizes()
      .subscribe(sizes => this.sizes = sizes);
  }

  getCollection()
    :
    void {
    this.userService.getCollection()
      .subscribe(collection => this.collection = collection);
  }

  getCategories()
    :
    void {
    this.userService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  getAllOrder():void{
    this.userService.getAllOrder().subscribe(order=>this.orders = order)
  }
  onSubmitSizes() {
    this.clothesService.saveNewSize(
      this.reactiveFormSize.value.sizes
    ).subscribe(()=> {
      this.reloadPage()
    })}

  onSubmitCategory(){
    this.clothesService.saveNewCategory(
      this.reactiveFormCategory.value.category
    ).subscribe(()=> {
      this.reloadPage();
    })
  }

  onSubmitCollection(){
    this.clothesService.saveNewCollection(
      this.reactiveFormCollection.value.collection
    ).subscribe(()=> {
      this.reloadPage();
    })
  }
  reloadPage(): void {
    window.location.reload();
  }
}


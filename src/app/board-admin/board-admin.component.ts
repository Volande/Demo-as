import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {Categories} from "../entity/categories";
import {Collection} from "../entity/collection";
import {Size} from "../entity/size";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductsService} from "../products.service";
import {MatDialog} from "@angular/material/dialog";
import {Customer} from "../entity/customer";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})


export class BoardAdminComponent implements OnInit {




  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  bossColumns:string[]=["firstName","lastName"]
  columnsToDisplayCustomers:string[]=["firstName","lastName",
    "created", "update","numberPhone","status","postOffice",
    "departmentPostOffice", "sum"]

  displayedColumnsOrder:string[]=[
    "product","amount","size","price"
  ]
  expandedElement: Customer | null;
  reactiveFormSize: FormGroup;
  reactiveFormCategory: FormGroup;

  reactiveFormCollection:FormGroup;
  sizesMaxLength = 30;
  categories: Categories[] = [];
  collection: Collection[] = [];
  sizes: Size[] = [];
  displayedColumnsNew: string[] = ['id', 'title'];

  customers: Customer[]=[];
  public bossesDataSource: MatTableDataSource<Customer> = new MatTableDataSource();

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              public productsService: ProductsService,
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
    this.userService.getAllOrder().subscribe(response => {
      this.customers = response

      this.customers = this.customers.map((element) => ({
        ...element,
        isExpanded: false
      }));
    }, error => {
      console.log(error);
    });

  }
  onSubmitSizes() {
    this.productsService.saveNewSize(
      this.reactiveFormSize.value.sizes
    ).subscribe(()=> {
      this.reloadPage()
    })}

  onSubmitCategory(){
    this.productsService.saveNewCategory(
      this.reactiveFormCategory.value.category
    ).subscribe(()=> {
      this.reloadPage();
    })
  }

  onSubmitCollection(){
    this.productsService.saveNewCollection(
      this.reactiveFormCollection.value.collection
    ).subscribe(()=> {
      this.reloadPage();
    })
  }
  reloadPage(): void {
    window.location.reload();
  }
}


import {Component, OnInit} from '@angular/core';
import {UserService} from "../_services/user.service";
import {Collection} from "../entity/collection";
import {Product} from "../entity/product";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";


@Component({
  selector: 'app-collection-menu',
  templateUrl: './collection-menu.component.html',
  styleUrls: ['./collection-menu.component.css']
})
export class CollectionMenuComponent implements OnInit {
  collection: Collection[] = [];

  clothes: Product[];

  constructor(private userService: UserService,
              public dialog: MatDialog,
              private router: Router,
             ) {
  }


  ngOnInit(): void {
    this.getCollection()
  }

  getCollection(): void {
    this.userService.getCollection()
      .subscribe(collection => this.collection = collection);
  }

  replacePage(): void {
    this.router.navigateByUrl('/market')
  }

  searchProduct(s: string) {

    window.sessionStorage.setItem("collection",s);

    this.replacePage();


  }
}

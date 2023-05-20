import {Component, OnInit} from '@angular/core';
import {UserService} from "../_services/user.service";
import {Collection} from "../entities/collection";
import {Product} from "../entities/product";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {LangChangedEvent, TranslocoService} from "@ngneat/transloco";


@Component({
  selector: 'app-collection-menu',
  templateUrl: './collection-menu.component.html',
  styleUrls: ['./collection-menu.component.css']
})
export class CollectionMenuComponent implements OnInit {
  collection: Collection[] = [];


  index :number;

  constructor(private userService: UserService,
              public dialog: MatDialog,
              private router: Router,
              private translocoService: TranslocoService,
             ) {
  }


  ngOnInit(): void {
    this.getCollection();
    // @ts-ignore
    this.translocoService.langChanges$.subscribe((event: LangChangedEvent) =>

    {
      // @ts-ignore
      this.index = ['uk', 'en'].indexOf(event);
    });
  }

  getCollection(): void {
    this.userService.getCollection()
      .subscribe(collection => this.collection = collection);
  }

  replacePage(): void {
    this.router.navigateByUrl('/market')
  }

  searchProduct(s: Collection) {
    let collection : any = JSON.stringify(s);


    window.sessionStorage.setItem("collection",collection);

    this.replacePage();


  }
}

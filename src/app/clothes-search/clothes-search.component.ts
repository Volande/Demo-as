import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Product} from "../entities/product";



@Component({
  selector: 'app-clothes-search',
  templateUrl: './clothes-search.component.html',
  styleUrls: ['./clothes-search.component.css']
})
export class ClothesSearchComponent implements OnInit {
  wardrobe$!: Observable<Product[]>;
  value = 'Clear me';
  private searchTerms = new Subject<string>();

  constructor() { }

  search(term: string): void{
    this.searchTerms.next(term);
  }

  ngOnInit(): void {

  }

}


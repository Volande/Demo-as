import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {
  debounceTime, distinctUntilChanged, switchMap
} from "rxjs";
import {Clothes} from "../clothes";
import {ClothesService} from "../clothes.service";


@Component({
  selector: 'app-clothes-search',
  templateUrl: './clothes-search.component.html',
  styleUrls: ['./clothes-search.component.css']
})
export class ClothesSearchComponent implements OnInit {
  wardrobe$!: Observable<Clothes[]>;
  value = 'Clear me';
  private searchTerms = new Subject<string>();

  constructor(private clothesService: ClothesService) { }

  search(term: string): void{
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.wardrobe$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.clothesService.searchClothes(term)),
    );
  }

}


import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Clothes} from './entity/clothes';
import {MessageService} from './message.service';
import {Clothes_dto} from "./entity/clothes_dto";
import {Size} from "./entity/size";
import {Image} from "./entity/image";
import {Categories} from "./entity/categories";




@Injectable({providedIn: 'root'})
export class ClothesService {
  @Output() event = new EventEmitter();


  eventSelectedProductQuantity: number
  private heroesUrl = 'http://localhost:8082'  //URL to web api


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  authenticated = false;
  clothes: Clothes[];

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }


  getClothe(): Observable<Clothes[]> {
    return this.http.get<Clothes[]>(`${this.heroesUrl}/products/findAll`)
      .pipe(
        catchError(this.handleError<Clothes[]>('getClothes', []))
      );
  }

  removeCriterionsFilter(){
    localStorage.removeItem("criterionsFilter");
  }



  findProduct(
    availability: string,
    priceMin: number,
    priceMax:number,
    size: string[],
    collection: string[],
    categories: string[]) {


    let collectionFind = {
      availability: availability,
      minPrice: priceMin,
      maxPrice:priceMax,
      size: size,
      collection: collection,
      categories: categories
    }


    return this.http.post<Clothes[]>(this.heroesUrl + "/products/filter",
      JSON.stringify(collectionFind))
  }

  updateClothe(
    id: number,
    title: string,
    content: string,
    compound: string,
    price: number,
    availability: string,
    sizes: Array<string>,
    categories: Array<string>,
    collection: string,
    productImages: Image[],
    images: File[],
  ) {
    // @ts-ignore
    let clothes = {
      id: id,
      title: title,
      content: content,
      compound: compound,
      price: price,
      availability: availability,
      size: sizes,
      categories: categories,
      collection: collection,
      image: productImages

    } as Clothes_dto

    const formData = new FormData;
    if (images.length > 0) {
      for (const row of images) {
        formData.append('image', row);
      }
    }
    formData.append('clothes', new Blob([JSON.stringify(clothes)], {
      type: 'application/json'
    }))


    return this.http.post(this.heroesUrl + "/products/save",
      formData).pipe(
      tap(_ => this.log(`isTokenValid error`)),
      catchError((err) => {
        return throwError(err);
      })
    )

  }

  saveClothe(
    title: string,
    content: string,
    compound: string,
    price: number,
    availability: string,
    sizes: Array<string>,
    categories: Array<string>,
    collection: string,
    images: File[]
  ) {
    // @ts-ignore
    let clothes = {
      title: title,
      content: content,
      compound: compound,
      price: price,
      availability: availability,
      size: sizes,
      categories: categories,
      collection: collection,

    } as Clothes_dto

    const formData = new FormData;
    if (images.length > 0) {
      for (const row of images) {
        formData.append('image', row);
      }
    }
    formData.append('clothes', new Blob([JSON.stringify(clothes)], {
      type: 'application/json'
    }))


    return this.http.post(this.heroesUrl + "/products/save",
      formData).pipe(
      tap(_ => this.log(`isTokenValid error`)),
      catchError((err) => {
        return throwError(err);
      })
    )

  }

  saveNewSize(sizes: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('title', sizes);
    return this.http.post(this.heroesUrl + '/products/newSize', params);
  }

  saveNewCategory(category: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('title', category);
    return this.http.post(this.heroesUrl + '/products/newCategory', params);
  }

  saveNewCollection(collection: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('title', collection);
    return this.http.post(this.heroesUrl + '/products/newCollection', params);
  }


  getHero(id: number): Observable<Clothes> {
    const url = `${this.heroesUrl}/products/clothes/${id}`;
    return this.http.get<Clothes>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Clothes>(`getHero id=${id}`))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


  deleteClothe(clotheId: number) {

    return this.http.delete(
      this.heroesUrl + '/products' + "/" + clotheId
    ).pipe(
      tap(_ => this.log(`isTokenValid error`)),
      catchError((err) => {
        return throwError(err);
      })
    )
  }



}


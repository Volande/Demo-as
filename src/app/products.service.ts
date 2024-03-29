import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Product} from './entities/product';
import {MessageService} from './message.service';
import {Product_dto} from "./entities/product_dto";
import {Size} from "./entities/size";
import {Image} from "./entities/image";
import {Categories} from "./entities/categories";
import {ProductInformation} from "./entities/product-information";
import {B} from "@angular/cdk/keycodes";




@Injectable({providedIn: 'root'})
export class ProductsService {
  @Output() event = new EventEmitter();


  eventSelectedProductQuantity: number
  private heroesUrl = 'http://localhost:8082'  //URL to web api
  private nullArray:number[] = []

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  authenticated = false;
  clothes: Product[];
  categoriesId : number[] =[];

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }


  getClothe(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.heroesUrl}/products/findAll`)
      .pipe(
        catchError(this.handleError<Product[]>('getClothes', []))
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
    categories: Categories[]) {




    let collectionFind = {
      availability: availability,
      minPrice: priceMin,
      maxPrice:priceMax,
      size: size,
      collection: collection,
      categories: categories
    }


    return this.http.post<Product[]>(this.heroesUrl + "/products/filter",
      JSON.stringify(collectionFind))

  }

  updateClothe(
    id: number,
    id_UA_productInfo:number,
    title_UA: string,
    content_UA: string,
    compound_UA: string,
    id_EN_productInfo:number,
    title_EN: string,
    content_EN: string,
    compound_EN: string,
    price: number,
    availability: string,
    sizes: Array<string>,
    categories: Array<string>,
    collection: string,
    productImages: Image[],
    images: File[],
  ) {
    let productInfoUA={
      id:id_UA_productInfo,
      language: 'uk',
      title:title_UA,
      compound:compound_UA,
      content:content_UA

    } as ProductInformation

    let productInfoEN={
      id:id_EN_productInfo,
      language: 'en',
      title:title_EN,
      compound:compound_EN,
      content:content_EN

    } as ProductInformation

    // @ts-ignore
    let productDto = {
      id: id,
      price: price,
      availabilityName: availability,
      size: sizes,
      categoryName: categories,
      collectionName: collection,
      image: productImages,
      productInformation:[productInfoUA,productInfoEN],

    } as Product_dto




    const formData = new FormData;
    if (images.length > 0) {
      for (const row of images) {
        formData.append('image', row);
      }
    }

    formData.append('availabilityName',availability);
    formData.append('categoryName',new Blob([JSON.stringify(categories)], {
      type: 'application/json'
    }));
    formData.append('collectionName',collection);

    formData.append('clothes', new Blob([JSON.stringify(productDto)], {
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
    title_UA: string,
    content_UA: string,
    compound_UA: string,
    title_EN: string,
    content_EN: string,
    compound_EN: string,
    price: number,
    availability: string,
    sizes: Array<string>,
    categories: Array<string>,
    collection: string,
    images: File[]
  ) {
    // @ts-ignore


    let productInfoUA={
      language: 'uk',
      title:title_UA,
      compound:compound_UA,
      content:content_UA

    } as ProductInformation

    let productInfoEN={
      language: 'en',
      title:title_EN,
      compound:compound_EN,
      content:content_EN

    } as ProductInformation

    // @ts-ignore
    let productDto = {
      price: price,
      size: sizes,
      productInformation:[productInfoUA,productInfoEN],

    } as Product_dto


    const formData = new FormData;
    if (images.length > 0) {
      for (const row of images) {
        formData.append('image', row);
      }
    }
    formData.append('availabilityName',availability);
    formData.append('categoryName',new Blob([JSON.stringify(categories)], {
      type: 'application/json'
    }));
    formData.append('collectionName',collection);

    formData.append('clothes', new Blob([JSON.stringify(productDto)], {
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


  getHero(id: number): Observable<Product> {
    const url = `${this.heroesUrl}/products/clothes/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
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
    this.messageService.add(`ProductService: ${message}`);
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


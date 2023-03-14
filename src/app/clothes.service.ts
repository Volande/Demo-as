import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Clothes} from './entity/clothes';
import {MessageService} from './message.service';
import {Size} from "./entity/size";
import {Clothes_dto} from "./entity/clothes_dto";
import {Categories} from "./entity/categories";


interface GetResponse {
  _embedded: {
    clothes: Clothes[];
    _links: { self: { href: string } };
  };
}

@Injectable({providedIn: 'root'})
export class ClothesService {

  private heroesUrl = 'http://localhost:8082'  //URL to web api


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  authenticated = false;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }


  getHeroes(): Observable<Clothes[]> {
    return this.http.get<GetResponse>(`${this.heroesUrl}/products/findAll`)
      .pipe(
        map(response => response._embedded.clothes),
        tap(clothes => this.log(`fetched clothes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }


  saveClothe(
    title: string,
    content: string,
    compound: string,
    price: number,
    availability: boolean,
    sizes: Array<string>,
    categories: Array<string>,
    newCategory: Array<string>,
    collection: string,
    newCollection: string,
    image: File
  ) {
    // @ts-ignore
    let clothes = {
      title: title,
      content: content,
      compound: compound,
      price: price,
      availability: availability,
      size: sizes,
      categories: categories || newCategory,
      collection: collection || newCollection,

    } as Clothes_dto

    const formData = new FormData;
    formData.append('image',image)
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

  saveNewSize(sizes: string) : Observable<any> {
    let params = new HttpParams();
    params = params.set('title', sizes);
    return this.http.post(this.heroesUrl + '/products/sizes', params);
  }

  saveNewCategory(category: string) : Observable<any> {
    let params = new HttpParams();
    params = params.set('title', category);
    return this.http.post(this.heroesUrl + '/products/newCategory', params);
  }

  saveNewCollection(collection: string) : Observable<any> {
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
}


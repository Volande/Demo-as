
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Clothes } from './clothes';
import { MessageService } from './message.service';


interface GetResponse {
  _embedded: {
    clothes: Clothes[];
    _links: {self: {href: string}};
  };
}

@Injectable({ providedIn: 'root' })
export class ClothesService {

  private heroesUrl = 'http://localhost:8082'  //URL to web api


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  authenticated = false;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }



  getHeroes (): Observable<Clothes[]> {
    return this.http.get<GetResponse>(`${this.heroesUrl}/products/findAll`)
      .pipe(
        map(response => response._embedded.clothes),
        tap(clothes => this.log(`fetched clothes`)),
        catchError(this.handleError('getHeroes', []))
      );
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



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Clothes } from './clothes';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class ClothesService {

  private heroesUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  getHeroes(): Observable<Clothes[]> {
    return this.http.get<Clothes[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Clothes[]>('getHeroes', []))
      );
  }


  getHeroNo404<Data>(id: number): Observable<Clothes> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Clothes[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Clothes>(`getHero id=${id}`))
      );
  }


  getHero(id: number): Observable<Clothes> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Clothes>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Clothes>(`getHero id=${id}`))
    );
  }


  searchClothes(term: string): Observable<Clothes[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Clothes[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Clothes[]>('searchHeroes', []))
    );
  }




  addHero(hero: Clothes): Observable<Clothes> {
    return this.http.post<Clothes>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Clothes) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Clothes>('addHero'))
    );
  }


  deleteHero(id: number): Observable<Clothes> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Clothes>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Clothes>('deleteHero'))
    );
  }


  updateHero(hero: Clothes): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
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


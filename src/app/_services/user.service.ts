import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Clothes} from "../entity/clothes";
import {catchError, tap} from "rxjs/operators";
import {Categories} from "../entity/categories";


const API_URL = 'http://localhost:8082/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<Clothes[]> {
    return this.http.get<Clothes[]>(API_URL + 'products/');
  }

  getCategories():Observable<Categories[]> {
    return this.http.get<Categories[]>(API_URL + 'products/categories');
  }



  getHero(id: number): Observable<Clothes> {
    const url = API_URL + "products/clothes/" + id;
    return this.http.get<Clothes>(url);
  }




  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}


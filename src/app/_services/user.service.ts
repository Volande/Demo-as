import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Clothes} from "../entity/clothes";
import {Categories} from "../entity/categories";
import {Collection} from "../entity/collection";
import {Size} from "../entity/size";


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
  getCollection():Observable<Collection[]> {
    return this.http.get<Collection[]>(API_URL + 'products/collection');
  }

  getSizes():Observable<Size[]> {
    return this.http.get<Size[]>(API_URL + 'products/sizes');
  }


  getHero(id: number): Observable<Clothes> {
    const url = API_URL + "products/clothes/" + id;
    return this.http.get<Clothes>(url);
  }





}


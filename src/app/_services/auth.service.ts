import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";


const AUTH_API = 'http://localhost:8082/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('username', username);
    params = params.set('password', password);
    return this.http.post(AUTH_API + 'api/v1/auth/login', params);
  }

  register(username: string, email: string, password: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('username', username);
    params = params.set('password', password);
    params = params.set('email', email);
    return this.http.post(AUTH_API + 'user/newUser', params);
  }
}

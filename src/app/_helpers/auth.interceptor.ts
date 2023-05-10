import {HTTP_INTERCEPTORS, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';
import {TranslocoService} from "@ngneat/transloco";

const TOKEN_HEADER_KEY = 'Authorization';// for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenStorageService: TokenStorageService,
              private translocoService: TranslocoService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenStorageService.getUser()?.jwt;
    if (token != null && token != 'undefined') {
      authReq = req.clone({ headers: req.headers.append(TOKEN_HEADER_KEY, 'Bearer ' + token ) });
    }

    if (localStorage.getItem('Locale') != null && localStorage.getItem('Locale') != 'undefined') {
     const language = localStorage.getItem('Locale')
      // @ts-ignore
      authReq = req.clone({ headers: req.headers.append('Accept-language',language  ) });
    }

    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

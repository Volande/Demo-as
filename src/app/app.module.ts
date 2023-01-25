

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { MessagesComponent } from './messages/messages.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { CarouselMainComponent } from './carousel-main/carousel-main.component';
import { ClothesComponent } from './clothes/clothes.component';
import { AboutComponent } from './about/about.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BasketComponent } from './basket/basket.component';
import { BasketMobileComponent } from './basket-mobile/basket-mobile.component';
import { ClothesSearchComponent } from './clothes-search/clothes-search.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ClothesPageComponent } from './clothes-page/clothes-page.component';
import { RelevantsComponent } from './relevants/relevants.component';
import { CollectionMenuComponent } from './collection-menu/collection-menu.component';
import { ConvertorComponent } from './convertor/convertor.component';
import { LoginComponent } from './login/login.component';
import {ClothesService} from "./clothes.service";


@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,

    MessagesComponent,
    CarouselMainComponent,
    ClothesComponent,
    AboutComponent,
    BasketComponent,
    BasketMobileComponent,
    ClothesSearchComponent,
    MainPageComponent,
    ClothesPageComponent,
    RelevantsComponent,
    CollectionMenuComponent,
    ConvertorComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [ClothesService, {multi: true, provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor}],
  bootstrap: [AppComponent]
})
export class AppModule { }


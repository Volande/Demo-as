import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- NgModel lives here


import {MessagesComponent} from './messages/messages.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {CarouselMainComponent} from './carousel-main/carousel-main.component';
import {ClothesComponent} from './clothes/clothes.component';
import {AboutComponent} from './about/about.component';

import {BasketComponent} from './basket/basket.component';
import {BasketMobileComponent} from './basket-mobile/basket-mobile.component';
import {ClothesSearchComponent} from './clothes-search/clothes-search.component';
import {MainPageComponent} from './main-page/main-page.component';
import {ClothesPageComponent} from './clothes-page/clothes-page.component';
import {RelevantsComponent} from './relevants/relevants.component';
import {CollectionMenuComponent} from './collection-menu/collection-menu.component';
import {ConvertorComponent} from './convertor/convertor.component';
import {LoginComponent} from './login/login.component';
import {ClothesService} from "./clothes.service";
import {RegisterComponent} from './register/register.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';



import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ImageSliderModule} from "./image-slider/image-slider.module";
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { AddProductComponent } from './add-product/add-product.component';
import {MatSelectModule} from "@angular/material/select";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { DndListModule } from 'ngx-drag-and-drop-lists';


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
    LoginComponent,
    RegisterComponent,
    BoardAdminComponent,
    AddProductComponent,



  ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        MatIconModule,
        NgbModule,
        NgbPaginationModule,
        NgbAlertModule,
        ImageSliderModule,
        MatDialogModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        MatTableModule,
        MaterialFileInputModule,
        DragDropModule,
        DndListModule


    ],
  providers: [ClothesService, {
    multi: true,
    provide: HTTP_INTERCEPTORS,
    useClass: XhrInterceptor
  }, authInterceptorProviders,],
  bootstrap: [AppComponent],

})
export class AppModule {
}


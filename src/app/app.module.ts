import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- NgModel lives here


import {MessagesComponent} from './messages/messages.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {CarouselMainComponent} from './carousel-main/carousel-main.component';
import {MarketComponent} from './market/market.component';
import {AboutComponent} from './about/about.component';

import {BasketComponent} from './basket/basket.component';
import {BasketMobileComponent} from './basket-mobile/basket-mobile.component';
import {ClothesSearchComponent} from './clothes-search/clothes-search.component';
import {MainPageComponent} from './main-page/main-page.component';
import {ClothesPageComponent} from './clothes-page/clothes-page.component';
import {RelevantsComponent} from './relevants/relevants.component';
import {CollectionMenuComponent} from './collection-menu/collection-menu.component';
import {ConvertorComponent} from './convertor/convertor.component';

import {ClothesService} from "./clothes.service";

import {BoardAdminComponent} from './board-admin/board-admin.component';
import { PopupFormLoginComponent } from './popup-form-login/popup-form-login.component';
import { PopupFormSingupComponent } from './popup-form-singup/popup-form-singup.component';


import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ImageSliderModule} from "./image-slider/image-slider.module";
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { AddProductComponent } from './add-product/add-product.component';
import { ConfirmationDeleteProductComponent } from './confirmation-delete-product/confirmation-delete-product.component';
import {MatSelectModule} from "@angular/material/select";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { DndListModule } from 'ngx-drag-and-drop-lists';
import {MatSidenavModule} from "@angular/material/sidenav";






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
    MarketComponent,
    AboutComponent,
    BasketComponent,
    BasketMobileComponent,
    ClothesSearchComponent,
    MainPageComponent,
    ClothesPageComponent,
    RelevantsComponent,
    CollectionMenuComponent,
    ConvertorComponent,
    BoardAdminComponent,
    AddProductComponent,
    ConfirmationDeleteProductComponent,
    PopupFormLoginComponent,
    PopupFormSingupComponent,



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
    DndListModule,
    MatSidenavModule,


  ],
  providers: [ClothesService, {
    multi: true,
    provide: [HTTP_INTERCEPTORS ,MatDialogRef,{provide: MAT_DIALOG_DATA, useValue: {}}],
    useValue: {},
    useClass: XhrInterceptor
  }, authInterceptorProviders,],
  bootstrap: [AppComponent],

})
export class AppModule {
}


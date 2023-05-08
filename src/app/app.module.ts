import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- NgModel lives here

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import {CarouselMainComponent} from './carousel-main/carousel-main.component';
import {MarketComponent} from './market/market.component';
import {AboutComponent} from './about/about.component';
import {BasketComponent} from './basket/basket.component';
import {ClothesSearchComponent} from './clothes-search/clothes-search.component';
import {MainPageComponent} from './main-page/main-page.component';
import {ClothePageComponent} from './clothe-page/clothe-page.component';
import {RelevantsComponent} from './relevants/relevants.component';
import {CollectionMenuComponent} from './collection-menu/collection-menu.component';
import {ConvertorComponent} from './convertor/convertor.component';
import {ProductsService} from "./products.service";
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
import {MatListModule} from "@angular/material/list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { OrderingComponent } from './ordering/ordering.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatBadgeModule} from "@angular/material/badge";
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { TranslocoRootModule } from './transloco-root.module';
import {MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { APP_INITIALIZER } from '@angular/core';
import {UserService} from "./_services/user.service";
import { TranslocoService } from '@ngneat/transloco';
import {TokenStorageService} from "./_services/token-storage.service";
import { getBrowserLang } from '@ngneat/transloco';
import {LanguageSelectorComponent} from "./language-selector/language-selector.component";

export function preloadUser(userService: UserService, transloco: TranslocoService) {
  return function() {
    const currentLang = (window.navigator as Navigator).language.split('-')[0];
      return transloco.load(currentLang).toPromise();


    }

}

export const preLoad = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: preloadUser,
  deps: [UserService, TranslocoService]
};






@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http);
}

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    CarouselMainComponent,
    MarketComponent,
    AboutComponent,
    BasketComponent,
    ClothesSearchComponent,
    MainPageComponent,
    ClothePageComponent,
    RelevantsComponent,
    CollectionMenuComponent,
    ConvertorComponent,
    BoardAdminComponent,
    AddProductComponent,
    ConfirmationDeleteProductComponent,
    PopupFormLoginComponent,
    PopupFormSingupComponent,
    OrderingComponent,




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
    MatListModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatBadgeModule,
    PinchZoomModule,
    TranslocoRootModule,

    LanguageSelectorComponent,
    TranslateModule.forRoot({
      defaultLanguage: 'ua',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [ProductsService, {
    multi: true,
    provide: [HTTP_INTERCEPTORS ,MatDialogRef,{provide: MAT_DIALOG_DATA, useValue: {}},preLoad],
    useValue: {},
    useClass: XhrInterceptor
  }, authInterceptorProviders,],
  bootstrap: [AppComponent],

})
export class AppModule {
}


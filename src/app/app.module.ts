

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from './in-memory-data.service';
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
import { InformationComponent } from './information/information.component';
import { ShippingPaymentComponent } from './shipping-payment/shipping-payment.component';
import { PreReplacementComponent } from './pre-replacement/pre-replacement.component';
import { ExchangeReturnComponent } from './exchange-return/exchange-return.component';



@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
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
    InformationComponent,
    ShippingPaymentComponent,
    PreReplacementComponent,
    ExchangeReturnComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService,{dataEncapsulation:false}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

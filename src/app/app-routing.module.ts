import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import {ClothesComponent} from "./clothes/clothes.component";
import {AboutComponent} from "./about/about.component";
import {BasketComponent} from "./basket/basket.component";
import {BasketMobileComponent} from "./basket-mobile/basket-mobile.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {ClothesPageComponent} from "./clothes-page/clothes-page.component";
import {RelevantsComponent} from "./relevants/relevants.component";
import {CollectionMenuComponent} from "./collection-menu/collection-menu.component";
import {ConvertorComponent} from "./convertor/convertor.component";
import {InformationComponent} from "./information/information.component";
import {ExchangeReturnComponent} from "./exchange-return/exchange-return.component";
import {PreReplacementComponent} from "./pre-replacement/pre-replacement.component";
import {ShippingPaymentComponent} from "./shipping-payment/shipping-payment.component";


const routers: Routes = [
  {path: 'main-page', component: MainPageComponent},
  {path:'', redirectTo: '/main-page', pathMatch: 'full'},
  {path: 'detail/:id' , component: ClothesPageComponent},
  {path: 'clothes' , component: ClothesComponent},
  {path: 'about', component:AboutComponent},
  {path: 'basket', component:BasketComponent},
  {path: 'basket-mobile', component:BasketMobileComponent},
  {path:'relevants', component:RelevantsComponent},
  {path:'collection-menu', component:CollectionMenuComponent},
  {path:'convertor' , component:ConvertorComponent},
  {path:'information', component:InformationComponent},
  {path:'exchange-return', component:ExchangeReturnComponent},
  {path:'shipping-payment', component:ShippingPaymentComponent},
  {path:'pre-replacement', component:PreReplacementComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from "@angular/router";
import {MarketComponent} from "./market/market.component";
import {AboutComponent} from "./about/about.component";
import {BasketComponent} from "./basket/basket.component";
import {BasketMobileComponent} from "./basket-mobile/basket-mobile.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {ClothesPageComponent} from "./clothes-page/clothes-page.component";
import {RelevantsComponent} from "./relevants/relevants.component";
import {CollectionMenuComponent} from "./collection-menu/collection-menu.component";
import {ConvertorComponent} from "./convertor/convertor.component";
import { BoardAdminComponent } from './board-admin/board-admin.component';
import {ImageSliderComponent} from "./image-slider/image-slider.component";



const routers: Routes = [
  {path: 'main-page', component: MainPageComponent},
  {path:'', redirectTo: '/main-page', pathMatch: 'full'},
  {path:'detail/:id', component: ClothesPageComponent},
  {path: 'market' , component: MarketComponent},
  {path: 'about', component:AboutComponent},
  {path: 'basket', component:BasketComponent},
  {path: 'basket-mobile', component:BasketMobileComponent},
  {path:'relevants', component:RelevantsComponent},
  {path:'collection-menu', component:CollectionMenuComponent},
  {path:'convertor' , component:ConvertorComponent},
  {path: 'admin', component: BoardAdminComponent },
  {path:'image-slider', component:ImageSliderComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routers, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],

  declarations: [


  ]
})
export class AppRoutingModule {

}

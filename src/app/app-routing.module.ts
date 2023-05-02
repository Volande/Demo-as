import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from "@angular/router";
import {MarketComponent} from "./market/market.component";
import {AboutComponent} from "./about/about.component";
import {BasketComponent} from "./basket/basket.component";

import {MainPageComponent} from "./main-page/main-page.component";
import {ClothePageComponent} from "./clothe-page/clothe-page.component";
import {RelevantsComponent} from "./relevants/relevants.component";
import {CollectionMenuComponent} from "./collection-menu/collection-menu.component";
import {ConvertorComponent} from "./convertor/convertor.component";
import { BoardAdminComponent } from './board-admin/board-admin.component';
import {ImageSliderComponent} from "./image-slider/image-slider.component";
import {OrderingComponent} from "./ordering/ordering.component";



const routers: Routes = [
  {path: 'main-page', component: MainPageComponent},
  {path:'', redirectTo: '/main-page', pathMatch: 'full'},
  {path:'detail/:id', component: ClothePageComponent},
  {path: 'market' , component: MarketComponent},
  {path: 'about', component:AboutComponent},
  {path: 'basket', component:BasketComponent},
  {path:'relevants', component:RelevantsComponent},
  {path:'collection-menu', component:CollectionMenuComponent},
  {path:'convertor' , component:ConvertorComponent},
  {path: 'admin', component: BoardAdminComponent },
  {path:'image-slider', component:ImageSliderComponent},
  {path:'ordering',component:OrderingComponent}
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

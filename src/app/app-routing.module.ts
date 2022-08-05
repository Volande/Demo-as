import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import {HeroesComponent} from "./heroes/heroes.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";
import {ClothesComponent} from "./clothes/clothes.component";
import {AboutComponent} from "./about/about.component";
import {BasketComponent} from "./basket/basket.component";
import {BasketMobileComponent} from "./basket-mobile/basket-mobile.component";

const routers: Routes = [
  {path: 'heroes' , component:HeroesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'detail/:id' , component: HeroDetailComponent},
  {path: 'clothes' , component: ClothesComponent},
  {path: 'about', component:AboutComponent},
  {path: 'basket', component:BasketComponent},
  {path: 'basket-mobile', component:BasketMobileComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

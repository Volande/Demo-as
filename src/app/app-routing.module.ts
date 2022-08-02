import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import {HeroesComponent} from "./heroes/heroes.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";
import {CollectionComponent} from "./collection/collection.component";
import {ClothesComponent} from "./clothes/clothes.component";
import {DressComponent} from "./dress/dress.component";
import {AboutComponent} from "./about/about.component";

const routers: Routes = [
  {path: 'heroes' , component:HeroesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'detail/:id' , component: HeroDetailComponent},
  {path: 'collection' , component: CollectionComponent},
  {path: 'clothes' , component: ClothesComponent},
  {path: 'dress', component:DressComponent},
  {path: 'about', component:AboutComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

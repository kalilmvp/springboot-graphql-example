import {RouterModule, Routes} from "@angular/router";
import {CarListComponent} from "./car-list/car-list.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "../material.module";
import {NgModule} from "@angular/core";
import { CarEditComponent } from './car-edit/car-edit.component';

const routes: Routes = [
  {path: 'cars', component: CarListComponent},
  {path: 'cars/:id', component: CarEditComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CarListComponent, CarEditComponent],
  providers: []
})
export class CarsModule {

}

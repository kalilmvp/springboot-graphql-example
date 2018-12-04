import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes} from "@angular/router";
import { CarService} from "./car/car.service";
import { CarListComponent } from './car/car-list/car-list.component';
import { CovalentDialogsModule } from "@covalent/core";
import {CarsModule} from "./car/cars.module";

const routes: Routes = [
  {path: '', redirectTo: '/cars', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    CovalentDialogsModule,
    RouterModule.forRoot(routes),
    CarsModule
  ],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }

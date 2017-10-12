import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule} from '@angular/material';
import { AppComponent } from './app.component';
import { UnitListComponent } from './components/unit-list.componet'
import { LocationListComponent } from './components/location-list.componet'
import { HeaderComponent } from './components/header.component'
import {FoodListComponent} from './components/food-list.componet';

@NgModule({
  declarations: [
    AppComponent,
    UnitListComponent,
    LocationListComponent,
    FoodListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

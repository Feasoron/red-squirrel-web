import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { UnitListComponent } from './components/unit-list.componet'
import { LocationListComponent } from './components/location-list.componet'
import { HeaderComponent } from './components/header.component'
import {FoodListComponent} from './components/food-list.componet';
import { LoginAreaComponent } from './components/login-area.component';
import {AuthService} from './services/auth.service';
import { RouterModule } from '@angular/router';
import {CallbackComponent} from './callback/callback.component';

@NgModule({
  declarations: [
    AppComponent,
    UnitListComponent,
    LocationListComponent,
    FoodListComponent,
    HeaderComponent,
    LoginAreaComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: '', component: UnitListComponent },
      { path: 'callback', component: CallbackComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

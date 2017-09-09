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
import {AuthorizednAreaComponent} from './components/authorized-area.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ApiService} from './services/api-service';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';

@NgModule({
  declarations: [
    AppComponent,
    UnitListComponent,
    LocationListComponent,
    FoodListComponent,
    HeaderComponent,
    LoginAreaComponent,
    CallbackComponent,
    AuthorizednAreaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: UnitListComponent },
      { path: 'callback', component: CallbackComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [AuthService, ApiService, AuthHttp,
    provideAuth({
    headerName: 'Authorization',
    headerPrefix: 'bearer',
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('id_token')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
    noJwtError: true
  })],
  bootstrap: [AppComponent]
})
export class AppModule { }

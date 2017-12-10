import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, RequestOptions, Http} from '@angular/http';
import 'hammerjs';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatListModule,
  MatInputModule, MatIconModule} from '@angular/material';
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
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: () => {
      return localStorage.getItem('id_token');
    },
  }), http, options);
}
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
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: UnitListComponent },
      { path: 'callback', component: CallbackComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [AuthService, ApiService,  {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }

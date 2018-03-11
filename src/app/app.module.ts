import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, RequestOptions, Http} from '@angular/http';
import 'hammerjs';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatListModule,
  MatInputModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { AppComponent } from './app.component';
import { UnitListComponent } from './components/unit-list.componet'
import { LocationListComponent } from './components/location-list.componet'
import { HeaderComponent } from './components/header.component'
import {FoodListComponent} from './components/food-list.componet';
import { LoginAreaComponent } from './components/login-area.component';
import {AuthService} from './services/auth.service';
import { RouterModule, Routes } from '@angular/router';
import {AuthorizedAreaComponent} from './components/authorized-area.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ApiService} from './services/api-service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { DefinitionComponent } from './components/definition.component';
import {InventoryComponent} from './components/inventory.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: () => {
      return localStorage.getItem('id_token');
    },
  }), http, options);
}

const appRoutes: Routes = [
  { path: '', redirectTo: 'definitions',  pathMatch: 'full' },
  { path: 'inventory', component: InventoryComponent },
  { path: 'definitions', component: DefinitionComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    UnitListComponent,
    LocationListComponent,
    FoodListComponent,
    HeaderComponent,
    LoginAreaComponent,
    AuthorizedAreaComponent,
    DefinitionComponent,
    InventoryComponent
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
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
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

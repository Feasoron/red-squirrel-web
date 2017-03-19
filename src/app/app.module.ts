import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { UnitListComponent } from './components/unit-list.componet'

@NgModule({
  declarations: [
    AppComponent,
    UnitListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

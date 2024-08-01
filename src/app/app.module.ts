import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { getLocaleCurrencyName, getLocaleCurrencySymbol } from '@angular/common';


export function fixCurrency(locale_id:string){
  return `${getLocaleCurrencySymbol(locale_id)}(${getLocaleCurrencyName(locale_id)})`
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide:DEFAULT_CURRENCY_CODE,
      useFactory:fixCurrency,
      deps:[LOCALE_ID]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

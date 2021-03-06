import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouting } from './app.routing'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { JwtInterceptor } from './helpers/jwt-interceptor'
import { ErrorInterceptor } from './helpers/error-interceptor'

import { AppComponent } from './app.component';
import { SchoolGroupComponent } from './modules/school-group/components/school-group/school-group.component';

@NgModule({
  declarations: [
    AppComponent,
    SchoolGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

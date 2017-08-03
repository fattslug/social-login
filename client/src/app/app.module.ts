import { RouteService } from './route.service';

import { UserService } from './login-area/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginAreaComponent } from './login-area/login-area.component';
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    LoginAreaComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [UserService, RouteService],
  bootstrap: [AppComponent]
})
export class AppModule { }

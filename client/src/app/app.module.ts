import { LoginService } from './login-area/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginAreaComponent } from './login-area/login-area.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginAreaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }

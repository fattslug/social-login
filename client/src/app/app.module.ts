import { RouteService } from './route.service';
import { RouterModule, Routes } from '@angular/router';

import { UserService } from './login-area/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { LoginAreaComponent } from './login-area/login-area.component';
import { HttpModule } from "@angular/http";

const appRoutes: Routes = [
	{
		path: '', 
		redirectTo: 'home', 
		pathMatch: 'full' 
	},
	{
		path: 'home',
		component: LoginAreaComponent
	},
	{
		path: 'login/:userid',
		component: AppLoginComponent
	},
	{
		path: 'profile',
		component: AppLoginComponent
	}
];

@NgModule({
declarations: [
	AppComponent,
	LoginAreaComponent,
	AppLoginComponent
],
imports: [
	BrowserModule,
	HttpModule,
	RouterModule.forRoot(
		appRoutes,
		{ enableTracing: true }
	)
],
providers: [UserService, RouteService],
bootstrap: [AppComponent]
})
export class AppModule { }

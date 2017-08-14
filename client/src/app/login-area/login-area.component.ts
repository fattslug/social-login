import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { deserialize, serialize } from "serializer.ts/Serializer";

@Component({
	selector: 'app-login-area',
	templateUrl: './login-area.component.html',
	styleUrls: ['./login-area.component.css']
})
export class LoginAreaComponent implements OnInit {

	constructor(private userService: UserService, private http: Http) {
	}

	ngOnInit() {
	}

	// googleLogin(): Promise<any> {
	// 	console.log("LoginAreaComponent googleLogin() running...");
	// 	return new Promise(resolve => {
	// 		this.userService.doGoogleLogin().then((res) => {
	// 			console.log(res);
	// 			resolve(res);
	// 		})
	// 	});
	// }

	// facebookLogin(): Promise<any> {
	// 	console.log("LoginAreaComponent facebookLogin() running...");
	// 	return new Promise(resolve => {
	// 		this.userService.doFacebookLogin().then((res) => {
	// 			console.log(res);
	// 			resolve(res);
	// 		})
	// 	});
	// }

	// getCurrentUser(): Promise<any> {

	// 	return new Promise(resolve => {
	// 		this.userService.getUserByToken().then((res) => {
	// 			console.log(res);
	// 			resolve(res);
	// 		})
	// 	});
	// }

	public events = [];

	getAllUsers(): Promise<any> {
		console.log("LoginAreaComponent getAllUsers() running...");
		return new Promise(resolve => {
			this.userService.getAllUsers().then((res) => {
				console.log(res);
				resolve(res);
			})
		});
	}

	getEvents(): Promise<any> {
		console.log("LoginAreaComponent getEvents() running...");
		return new Promise((resolve, reject) => {
			this.http.get('https://www.googleapis.com/calendar/v3/calendars/primary/events?access_token=ya29.GmGcBB2DCJppMMROu5YfuHE82YUjcqnnsCbRcYFUZpXlCeprxMhmWiBzxTRzCELMVxJahFowqk8hF_C-iJ0GNJea5uUpNhMiRZ0yS2RUpQv0OdELDeWpojD0Cj4DR9NzjCE1').subscribe(res => {
				// let responseObj = deserialize<Response>(Response, res.json())
				console.log(res);
				resolve(true);
			});
		})
	}

}

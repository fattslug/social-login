import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

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
			this.http.get('https://www.googleapis.com/calendar/v3/calendars/primary/events?access_token=ya29.GlucBIidBxCSTSR36Iwq0WZAfKkDzoZOlPs6xbVwLdipnlaxe-1M5e1RFIZGomJs9OVgfyT8WHo7UWdXWD0IY3bMr-icw8orTsX0kTGwDvQASRog9P7wwji_p8cI').subscribe(res => {
				console.log(res);
				resolve(true);
			});
		})
	}

}

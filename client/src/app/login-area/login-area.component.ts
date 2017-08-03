import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-login-area',
	templateUrl: './login-area.component.html',
	styleUrls: ['./login-area.component.css']
})
export class LoginAreaComponent implements OnInit {

	constructor(private userService: UserService) {
		
	}

	ngOnInit() {
	}

	googleLogin(): Promise<any> {
		console.log("LoginAreaComponent googleLogin() running...");
		return new Promise(resolve => {
			this.userService.doGoogleLogin().then((res) => {
				console.log(res);
				resolve(res);
			})
		});
	}

	getAllUsers(): Promise<any> {
		console.log("LoginAreaComponent getAllUsers() running...");
		return new Promise(resolve => {
			this.userService.getAllUsers().then((res) => {
				console.log(res);
				resolve(res);
			})
		});
	}

} 

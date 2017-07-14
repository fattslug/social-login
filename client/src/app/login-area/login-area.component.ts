import { LoginService} from './login.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-login-area',
	templateUrl: './login-area.component.html',
	styleUrls: ['./login-area.component.css']
})
export class LoginAreaComponent implements OnInit {

	constructor(private loginService: LoginService) {
		
	}

	ngOnInit() {
	}

	googleLogin(): Promise<any> {
		console.log("LoginAreaComponent googleLogin() running...");
		return new Promise(resolve => {
			this.loginService.doGoogleLogin().then((res) => {
				console.log(res);
				resolve(res);
			})
		});
	}

} 

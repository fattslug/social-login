import { LoginService} from './login.service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
	selector: 'app-login-area',
	templateUrl: './login-area.component.html',
	styleUrls: ['./login-area.component.css']
})
export class LoginAreaComponent implements OnInit {

	constructor(private loginService: LoginService, private http: Http) {

	}

	ngOnInit() {
	}

	public events = [];


	googleLogin(): Promise<any> {
		console.log("LoginAreaComponent googleLogin() running...");
		return new Promise(resolve => {
			this.loginService.doGoogleLogin().then((res) => {
				console.log(res);
				resolve(res);
			})
		});
	}

	getAllUsers(): Promise<any> {
		console.log("LoginAreaComponent getAllUsers() running...");
		return new Promise(resolve => {
			this.loginService.getAllUsers().then((res) => {
				console.log(res);
				resolve(res);
			})
		});
	}



  getEvents(): Promise<any> {
    console.log("LoginAreaComponent getEvents() running...");
    return new Promise((resolve, reject) => {
      this.http.get('https://www.googleapis.com/calendar/v3/calendars/primary/events?access_token=ya29.GlucBIidBxCSTSR36Iwq0WZAfKkDzoZOlPs6xbVwLdipnlaxe-1M5e1RFIZGomJs9OVgfyT8WHo7UWdXWD0IY3bMr-icw8orTsX0kTGwDvQASRog9P7wwji_p8cI').subscribe(res => {
        // this.events =
        console.log(res);
        resolve(true);
      });
    })
  }

}

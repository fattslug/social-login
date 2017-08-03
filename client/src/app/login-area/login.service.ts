import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LoginService {

	constructor(private http: Http) {

	}

	doGoogleLogin(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.get('http://localhost:3000/auth/google').subscribe(res => {
				console.log(res);
				resolve(true);
			});
		})
	}

	getUserByToken(token: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.get('http://localhost:3000/user/token/' + token).subscribe(res => {
				console.log(res);
				resolve(res);
			});
		});
	}

	getAllUsers(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.get('http://localhost:3000/users').subscribe(res => {
				console.log(res);
				resolve(res);
			});
		});
	}
}

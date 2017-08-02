import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LoginService {

	constructor(private http: Http) {

	}

	doGoogleLogin(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.get('http://localhost:8080/auth/google').subscribe(res => {
				console.log(res);
				resolve(true);
			});
		})
	}

}

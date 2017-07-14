import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

	constructor() { }

	doGoogleLogin(): Promise<any> {
		return new Promise((resolve, reject) => {
			console.log("Doing Google login...");
			resolve(true);
		})
	}

}

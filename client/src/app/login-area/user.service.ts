import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './user';

import { deserialize, serialize } from "serializer.ts/Serializer";

@Injectable()
export class UserService {

	constructor(
		private http: Http) {
	}

	public currentUser = new User();

	isLoggedIn(): boolean {
		if (this.currentUser.id) {
			return true;
		} else {
			return false;
		}
	}

	doLogout(): void {
		this.currentUser = new User();
	}

	// doGoogleLogin(): Promise<any> {
	// 	return new Promise((resolve, reject) => {
	// 		this.http.get('http://192.168.141.242:3000/auth/google').subscribe(res => {
	// 			console.log(res);
	// 			resolve(true);
	// 		});
	// 	})
	// }

	// doFacebookLogin(): Promise<any> {
	// 	return new Promise((resolve, reject) => {
	// 		this.http.get('http://192.168.141.242:3000/auth/facebook').subscribe(res => {
	// 			console.log(res);
	// 			resolve(true);
	// 		});
	// 	})
	// }

	getUserByToken(token: string): Promise<User> {
		return new Promise((resolve, reject) => {
			this.http.get('http://localhost:3000/user/' + token).subscribe(res => {
				this.setActiveUser(deserialize<User>(User, res.json()));
				resolve(this.currentUser);
			});
		});
	}

	setActiveUser(user: User) {
		this.currentUser = user;
		console.log("Active user set: ", this.currentUser);
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

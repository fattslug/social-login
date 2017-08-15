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
		this.currentUser = null;
		localStorage.setItem('currentUser', null);
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

	getUserById(id: string): Promise<User> {
		return new Promise((resolve, reject) => {
			this.http.get('http://localhost:3000/user/' + id).subscribe(res => {
				console.log(res);
				this.setActiveUser(deserialize<User>(User, res.json()));
				resolve(this.currentUser);
			});
		});
	}

	setActiveUser(user: User) {
		this.currentUser = user;
		localStorage.setItem('currentUser', JSON.stringify({ token: user.token, userID: user.userID }));
		console.log("Active user set: ", this.currentUser);
	}

	getActiveUser(): User {
		return this.currentUser;
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

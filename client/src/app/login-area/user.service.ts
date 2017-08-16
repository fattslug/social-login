import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './user';

import { deserialize, serialize } from "serializer.ts/Serializer";

@Injectable()
export class UserService {

	currentUser: User;

	constructor(
		private http: Http) {
	}

	isLoggedIn(): boolean {
		let userCookie = JSON.parse(localStorage.getItem('currentUser'));
		if (userCookie && this.currentUser) {
			console.log("-- USER IS LOGGED IN --");
			return true;
		} else {
			return false;
		}
	}

	doLogout(): void {
		this.currentUser = null;
		localStorage.removeItem('currentUser');
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
				console.log("Getting user by ID: ", res.json());
				resolve(res.json());
			});
		});
	}

	setCurrentUser(user: User) {
		this.currentUser = user;
		localStorage.setItem('currentUser', JSON.stringify({ token: user.token, userID: user.userID }));
		console.log("Current user set: ", this.currentUser);
		console.log("Current USER: ", this.getCurrentUser());
	}

	getCurrentUser(): User {
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

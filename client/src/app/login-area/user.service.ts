import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './user';

import { deserialize, serialize } from "serializer.ts/Serializer";

@Injectable()
export class UserService {

	currentUser: User;

	constructor(
		private http: Http) {
			console.log("Constructor: ", this.currentUser);
	}

	isLoggedIn(): boolean {
		// Is there a user in local storage?
		// Is there a user in our service?
		// Are these users the same?
		let userCookie = JSON.parse(localStorage.getItem('currentUser'));
		if (userCookie && this.currentUser && (userCookie.userID === this.currentUser.userID)) {
			return true;
		} else {
			localStorage.removeItem('currentUser');
			this.currentUser = null;
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
				let user = deserialize<User>(User, res.json());
				console.log("User found: ", user);
				this.currentUser = user;
				resolve(user);
			});
		});
	}

	setCurrentUser(user: User) {
		this.currentUser = user;
		localStorage.setItem('currentUser', JSON.stringify({ token: user.token, userID: user.userID, timestamp: new Date()}));
	}

	getCurrentUser(): User {
		return this.currentUser;
	}

	getAllUsers(): Promise<User[]> {
		return new Promise((resolve, reject) => {
			this.http.get('http://localhost:3000/users').subscribe(res => {
				console.log(res.json());
				resolve(res.json());
			});
		});
	}
}

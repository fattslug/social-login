import { UserService } from './../login-area/user.service';
import { User } from '../login-area/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-app-login',
	templateUrl: './app-login.component.html',
	styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent implements OnInit {

	constructor(
		private userService: UserService,
		private activatedRoute:ActivatedRoute
	) { }

	private userId;
	isLoggedIn: boolean;

	ngOnInit() {
		this.isLoggedIn = this.userService.isLoggedIn();
		if (!this.isLoggedIn) {
			this.activatedRoute.params.subscribe((params: Params) => {
				this.userId = params['userid'];
			});
			if (this.userId) {
				this.userService.getUserById(this.userId).then((user: User) => {
					this.userService.setCurrentUser(user);
					this.isLoggedIn = true;
					// We can call more User APIs here based on the sm_platform
					// We just need the accessToken from local storage
				});
			} else {
				console.log(this.userService.getCurrentUser());
			}
		}
	}

}

import { UserService } from './../login-area/user.service';
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

	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.userId = params['userid'];
			console.log(this.userId);
		});

		this.userService.getUserByToken(this.userId);
	}

}

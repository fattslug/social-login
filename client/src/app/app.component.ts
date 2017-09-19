import { UserService } from './login-area/user.service';
import { LoginAreaComponent } from './login-area/login-area.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(private userService: UserService) {}
	title = 'app';
}

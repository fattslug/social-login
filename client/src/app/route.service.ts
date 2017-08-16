import { Injectable } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {OnInit, Component} from '@angular/core';

@Injectable()
export class RouteService {

	constructor(private activatedRoute: ActivatedRoute) { }

	getRouteParams(paramName: string): Promise<string> {
		let routeParam;

		return new Promise((resolve, reject) => {
			this.activatedRoute.params.subscribe((params: Params) => {
				routeParam = params[paramName];
				console.log(routeParam);

				resolve(routeParam);
			});
		});
	}

}

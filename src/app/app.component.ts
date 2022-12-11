import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    items: any | MenuItem[];

	ngOnInit() {
		this.items = [
			
			{
				label: 'Clients',
				icon: 'pi pi-user pi-file',
				routerLink: '/client'

			},
			{
				label: 'Providers',
				icon: 'pi pi-tablet pi-file',
				routerLink: '/provider'

			}

		];
	}

}


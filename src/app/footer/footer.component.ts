import { Component } from '@angular/core';

@Component({
	selector: 'app-footer',
	template: `
		<div class="container-fluid">
			<div class="row">
			<div class="col-sm-12">
				<div class="text-center py-4 text-white">
					Copyright <i class="fa fa-copyright"></i> {{ now | date: 'yyyy' }}
				</div>
			</div>
			</div>
		</div>
  `,
	styles: [`
		:host {
			background-color: #64788C; 
			display: block; 
		}
	`]
})
export class FooterComponent {
	now = new Date();

	constructor() { }
}
import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { ToDoListItem } from './interfaces/to-do-list-item';
import { Action } from './interfaces/action';

@Directive({
	selector: '[appActionButton]'
})
export class ActionButtonDirective {

	@Input() appAction: string;
	@Input() data: ToDoListItem;
	@Input() inputs: any[];

	@Output() action = new EventEmitter();

	constructor() { }

	@HostListener("click")
	onClick() {
		var data: Action = {
			"action": this.appAction,
			"data": this.data,
			"id": this.data.id,
			"inputs": this.inputs
		};

		this.action.emit(data);
	}
}
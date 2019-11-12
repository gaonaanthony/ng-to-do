import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ToDoListItem } from '../interfaces/to-do-list-item';
import { Action } from '../interfaces/action';

@Component({
	selector: 'app-edit-item',
	templateUrl: './edit-item.component.html',
	styles: [``]
})
export class EditItemComponent {

	@Input() toDo: ToDoListItem;

	@Output() action = new EventEmitter();

	@ViewChild( "title", {static: false, read: ElementRef} ) 
	private myInput: ElementRef;

	onAction ( data: any ) {
		this.action.emit( data );
	}

	onKeyDown ( $event: KeyboardEvent ) {
		var toDo: any = {};

		if ( $event.which === 13 ) {
			toDo.action = "save";
			toDo.data = this.toDo;
			toDo.id = this.toDo.id;
			toDo.inputs = [this.myInput.nativeElement];
			
			this.onAction( toDo );
		}
	}

	constructor() { }
}
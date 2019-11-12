import { Component, OnInit, HostListener } from '@angular/core';
import { ToDoListItem } from '../interfaces/to-do-list-item';
import { ToDoListItemsService } from '../to-do-list-items.service';
import { Key } from 'ts-keycode-enum';
import { fromEvent, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Action } from '../interfaces/action';

@Component({
	selector: 'app-to-do-list',
	templateUrl: './to-do-list.component.html',
	styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
	private items: ToDoListItem[]

	// Paging.
	itemsToDisplay: ToDoListItem[];
	numOfPages: number;
	resultsPerPage: number = 10;
	page: number = 1;

	constructor(
		private toDoListItemsService: ToDoListItemsService
	) { }

	/** Makes the API call for the data. */
	ngOnInit(): void {
		this.toDoListItemsService.getToDoListItems()
			.subscribe((items: ToDoListItem[]) => this.init(items));
	}

	/** Sets paging view */
	init(items: ToDoListItem[]): void {
		this.items = items;

		this.paging();
	}

	paging () {
		this.numOfPages = this.items.length / this.resultsPerPage;

		var starting = ((this.page - 1) * this.resultsPerPage);
		var ending = this.page * this.resultsPerPage;

		this.itemsToDisplay = this.items.slice(starting, ending)
	}

	/** Delegate available CRUD actions */
	handleAction(data: Action) {
		switch( data.action ) {
			case "save":
				this.saveItem( data );
				break;
			case "edit":
				this.editItem( data );
				break;
			case "delete":
				this.deleteItem( data );
				break;
			default:
				break;
		}
	}

	/** On change of completed checkbox toggle the completed state. */
	toggleCompleted(id: number): void {
		var item = this.findItem("id", id);

		item[0].completed = !item[0].completed;
	}

	editItem(data: Action): void {
		var item: ToDoListItem[];

		// Hide any active edit items.
		this.clearEditItems( data.data.id );
		
		// Toggle the edit item we clicked on.
		item = this.findItem("id", data.data.id);
		item[0].editing = !item[0].editing;
	}

	clearEditItems ( id?: number ): void {
		this.items.forEach( ( item ) => {
			if ( id && item.id === id ) return;
			item.editing = false 
		} );
	}

	saveItem(data: Action) {
		var item = this.findItem("id", data.data.id);
		item[0].title = data.inputs[0].value;
		item[0].editing = false;

		// Undo service.
		// this.monitorService.lastAction( data );
	}

	findItem(prop, val): ToDoListItem[] {
		return this.items.filter(item => item[prop] === val);
	}

	findDisplayItem(prop, val): ToDoListItem[] {
		return this.itemsToDisplay.filter(item => item[prop] === val);
	}

	deleteItem( data: Action ): void {
		var item = this.findItem("id", data.data.id);
		var spot = this.items.indexOf( item[0] );

		// use Itemstodispaly instead
		var item2 = this.findDisplayItem("id", data.data.id);
		var spot2 = this.itemsToDisplay.indexOf( item2[0] );

		this.items.splice( spot, 1 );
		this.itemsToDisplay.splice( spot2, 1 );

		// Undo service.
		// this.monitorService.lastAction( data );
	}

	/** Global Listeners */
	@HostListener("document:keydown", ["$event"])
	onKeyUp($event): void {
		if ($event.which === Key.Escape) {
			this.items.forEach(item => {
				if (item.editing) item.editing = false;
			});
		}
	}
}
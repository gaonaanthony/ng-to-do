import { Injectable } from "@angular/core";
import { ToDoListItem } from './interfaces/to-do-list-item';
import { Observable, of } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";

/*
    Services must have an asynchronous signature of some kind.
    Your methods should return an observable. i.e. the HttpClient.get() method returns an observable.
*/
@Injectable({
	providedIn: 'root'
})
export class ToDoListItemsService {
	// API
	private todoitemsUrl = "https://jsonplaceholder.typicode.com/todos";

	constructor(
		private http: HttpClient
	) { }

	getToDoListItems(): Observable<ToDoListItem[]> {
		// return of(this.items);

		// "an observable of an array of ToDoListItem"
		// HttpClient.get() returns the body of the response as an untyped JSON object by default. 
		// Applying the optional type specifier, <ToDoListItem[]> , gives you a typed result object.
		return this.http.get<ToDoListItem[]>( this.todoitemsUrl )
			.pipe(
				// The catchError() operator intercepts an Observable that failed. 
				// It passes the error an error handler that can do what it wants with the error.
				catchError( this.handleError<ToDoListItem[]>('getToDoListItems', [] ) )
			);
	}

	getToDoListItem ( items: ToDoListItem[] ) {
		
	}

	// Because each service method returns a different kind of Observable result, handleError() takes a type parameter 
	// so it can return the safe value as the type that the app expects.
	private handleError<T> ( operation = "operation", result?: T ) {
		// Return an error handling function to the catchError rxjs function.
		return ( error: any ): Observable<T> => {
			// Ideally, log the error to a custom error logger.
			console.error( `Operation ${operation} faild.`, error );

			// returns a safe value to the app so the app can keep working.
			return of ( result as T );
		};
	}
}

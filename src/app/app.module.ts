import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { EditItemComponent } from './edit-item/edit-item.component';


// HttpClient is Angular's mechanism for communicating with a remote server over HTTP.
// HttpClient methods return one value
// All HttpClient methods return an RxJS Observable of something.
import { HttpClientModule } from "@angular/common/http";

// Directives
import { ActionButtonDirective } from './action-button.directive';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ToDoListComponent,
    EditItemComponent,
    ActionButtonDirective,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

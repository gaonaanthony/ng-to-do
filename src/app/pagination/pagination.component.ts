import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  /** Number of pages */
  @Input() pages: number;
  @Input() startingPage: number = 1;

  pagingOptions: any[];

  constructor() { }

  ngOnInit() {
    console.log( this.pages );
  }

  ngOnChanges () {
    this.pagingOptions = Array( this.pages ).fill( undefined );
  }

  onChange ( $event ) {
    console.log( $event );
  }

}
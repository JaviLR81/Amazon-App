import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Step 1:
  // Create a property to track whether the menu is open.
  // Start with the menu collapsed so that it does not
  // appear initially when the page loads on a small screen!
  public isMenuCollapsed = true;

  searchTerm:string = '';
  placeholder:string = 'Search any product :D';

  @Output() onEnter:EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe(valor => {
        console.log("Emiti el evento onDebounce()");
      })
  }

  search(){
      console.log("search()",this.searchTerm);
      console.log("Emiti el evento onEnter()");
      this.onEnter.emit(this.searchTerm);
  }

  searchSuggestions(){
    console.log("searchSuggestions",this.searchTerm);
    this.debouncer.next(this.searchTerm);
  }

  // productSearch(search:string){

  // }

  // suggestions(event:string){
  //   console.log("Recibiendo la data del debouncer: "+event);
  // }


}

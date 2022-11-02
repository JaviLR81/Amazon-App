import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { from, Subject } from 'rxjs';
import { debounceTime, map, mergeAll, mergeMap, pluck, reduce, tap } from 'rxjs/operators';
import { HeaderSubjectService } from '../../services/header-subject/header-subject.service';

import * as actions from '../../../store/actions';
import { AppState } from 'src/app/store/app.reducers';


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
  totalCartItems: number = 0;
  totalPriceCartItems: number = 0;

  @Output() onEnter:EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();

  private _searchHistory:string[] = [];

  get searchHistory():string[] {
    return [...this._searchHistory];
  }

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private headerSubjectService: HeaderSubjectService
  ) { }

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(300),
        map(data => data.toLowerCase() )
      )
      .subscribe(valor => {
        this.store.dispatch(actions.setNewSearchBar({search: valor}));
      })

    this.store
      .subscribe( ({user, cart}) => {
            this.placeholder = user.isLookingProducts ? 'Search any product from the list :D' : 'Search any product :D';
            this.totalCartItems = cart.cartItems.length;
      })

    // TODO: Really not necessary just for educational purposes
    this.store
      .pipe(
        pluck('cart','cartItems'),
        mergeMap( data => from(data).pipe(
          map(d => d.price),
          reduce((acc, curr) => acc + curr))
        ),
        // mergeAll()
      )
      .subscribe( data => {
          this.totalPriceCartItems = data;
      })

  }

  search(){
      console.log("search()",this.searchTerm);
      console.log("Emiti el evento onEnter()");

      // Remove white spaces from start and end and transform to lower case
      let standarSearch = this.searchTerm.trim().toLowerCase();

      // When there is not content
      if(standarSearch.length === 0){
          return;
      }

      // Check if the value is not present yet
      if(!this._searchHistory.includes(standarSearch)){
        this._searchHistory.unshift(standarSearch);
        this._searchHistory = this._searchHistory.splice(0,10);
        localStorage.setItem("searchHistory",JSON.stringify(this._searchHistory));
      }


      this.router.navigate(['/product/list',standarSearch]);
      //this.onEnter.emit(this.searchTerm);

      this.searchTerm = '';
  }

  searchSuggestions(){
    // console.log("searchSuggestions",this.searchTerm);
    this.debouncer.next(this.searchTerm);
  }

  emitSubject(){
    this.headerSubjectService.login("Javi");
  }

  get userLoggedSubject$(){
    return this.headerSubjectService.userLoggedSubject$;
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

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

  private _searchHistory:string[] = [];

  get searchHistory():string[] {
    return [...this._searchHistory];
  }

  constructor(
    private router:Router,
    private authService:AuthService
  ) { }

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


      this.router.navigate(['/product/list',this.searchTerm]);
      //this.onEnter.emit(this.searchTerm);

      this.searchTerm = '';
  }

  searchSuggestions(){
    // console.log("searchSuggestions",this.searchTerm);
    this.debouncer.next(this.searchTerm);
  }

  isAuthenticated():boolean{
    return this.authService.isAuthenticated();
  }

  logout():void{
    this.authService.logout();
  }

}

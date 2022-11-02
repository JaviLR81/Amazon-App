import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderSubjectService {

  userLoggedSubject$: Subject<string> = new Subject();

  constructor() { }

  login(name: string){
    let date = new Date();
    this.userLoggedSubject$.next(name.concat("!").concat(date.getTime().toString()));
  }


}

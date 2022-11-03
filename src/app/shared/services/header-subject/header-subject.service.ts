import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderSubjectService {

  private userLoggedSubject: Subject<string> = new Subject();
  userLogged$ = this.userLoggedSubject.asObservable();

  constructor() { }

  login(name: string){
    let date = new Date();
    this.userLoggedSubject.next(name.concat("!").concat(date.getTime().toString()));
  }


}

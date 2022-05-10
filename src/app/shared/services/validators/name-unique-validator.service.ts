import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, EMPTY, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NameUniqueValidatorService implements AsyncValidator{

  constructor() { }

  validate(control: AbstractControl):  Observable<ValidationErrors | null> {

    let name:string = control.value;

    name = name.toLowerCase();

    return of(EMPTY).pipe(
      delay(3000),
      map(resp => {
        return (name === 'javi') ? { nameIsUnique:true } : null
      })
    );
  }
}

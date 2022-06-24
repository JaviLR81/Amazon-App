import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor() { }

  hasValidationErrors(formGroup: FormGroup, field: string): boolean{

    let hasErrors  = (formGroup.get(field)?.errors === null)  ? false :true;
    let wasTouched = (formGroup.get(field)?.touched) ? true : false;

    return hasErrors && wasTouched;
  }

}

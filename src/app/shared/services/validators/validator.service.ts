import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }


   /**
   * Custom Validators
   */

    shouldBeANumber(control:FormControl): ValidationErrors | null{

      let numberValue = +control.value;

      // It's a number
      if(isNaN(numberValue) === false){
        return null;
      }else{
        return {
          isANumber:true
        }
      }

    }

    shouldBeMajorThanZero(control:FormControl): ValidationErrors | null{

      let numberValue = +control.value;

      let correctObject = {
        isNotZero: true
      }

      // It's a number
      if(isNaN(numberValue) === false){

        if(numberValue > 0){
          return null;
        }else{
          return correctObject;
        }

      }else{
        return correctObject;
      }

    }

    descriptionShouldContainName(name:string,description:string){

      return (formGroup:AbstractControl):ValidationErrors | null => {

        const nameField:string = formGroup.get(name)?.value;
        const descriptionField:string = formGroup.get(description)?.value;

        if(!descriptionField.includes(nameField)) {
          formGroup.get(description)?.setErrors({ containsName:true });
          return {
            containsName:true
          }
        }

        formGroup.get(description)?.setErrors(null);
        return null;
      }

    }

}

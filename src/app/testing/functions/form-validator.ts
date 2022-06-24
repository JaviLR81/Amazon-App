import { AbstractControl, FormGroup } from '@angular/forms';


export function formControlHasErrors(formControl: AbstractControl): boolean{
  return (formControl.errors === null) ? false : true;
}

export function setFormControlValue(productForm: FormGroup, fieldName: string, value: any): AbstractControl | null{
  let formControl = productForm.get(fieldName);
  formControl?.setValue(value);
  return formControl;
}

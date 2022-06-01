import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[errorMessage]'
})
export class ErrorMessageDirective {

  htmlElement:ElementRef<HTMLSpanElement>;

  @Input() set errorMessage(condicion:boolean){
    if(condicion){
      this.htmlElement.nativeElement.innerText = 'El campo tiene un error';
    }else{
      this.htmlElement.nativeElement.innerText = '';
    }
  }

  // El campo tiene un error
  constructor(private el:ElementRef<HTMLSpanElement>) {
    this.htmlElement = el;
  }
}

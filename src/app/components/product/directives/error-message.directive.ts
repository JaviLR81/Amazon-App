import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[errorMessage]'
})
export class ErrorMessageDirective implements OnInit{

  private _message:string = 'El campo presenta errores';

  htmlElement:ElementRef<HTMLSpanElement>;

  @Input() set errorMessage(condicion:boolean){
    if(condicion){
      this.htmlElement.nativeElement.classList.add('hidden');
    }else{
      this.htmlElement.nativeElement.classList.remove('hidden');
    }
  }

  @Input() set message(message:string){
    this._message = message;
    this.setMessage();
  }

  constructor(private el:ElementRef<HTMLSpanElement>) {
    this.htmlElement = el;
  }

  ngOnInit(): void {
    this.setMessage();
  }

  setMessage(){
    this.htmlElement.nativeElement.innerText = this._message;
  }



}

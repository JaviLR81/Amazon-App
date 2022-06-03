
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[enlargeImage]'
})
export class EnlargeImageDirective implements OnInit {


  private _height = '550px';
  private _width  = 'auto';

  @Input() set height(value:string){
    this._height = value;
    this.setHeight();
  }

  @Input() set width(value:string){
    this._width = value;
    this.setWidth();
  }

  private htmlElement:ElementRef<HTMLImageElement>;

  constructor(private el:ElementRef<HTMLImageElement>) {
    this.htmlElement = el;
  }

  ngOnInit(): void {
    this.setHeight();
    this.setWidth();
  }

  setHeight(){
    this.htmlElement.nativeElement.style.height = this._height;
  }

  setWidth(){
    this.htmlElement.nativeElement.style.width  = this._width;
  }


}

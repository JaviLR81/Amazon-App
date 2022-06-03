import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[enlargeImageHover]'
})
export class EnlargeImageHoverDirective {


  private _height = '550px';
  private _width  = 'auto';
  defaultHeight!:string;
  defaultWidth !:string;

  @Input() set height(value:string){
    this._height = value;
  }

  @Input() set width(value:string){
    this._width = value;
  }

  private htmlElement:ElementRef<HTMLImageElement>;

  constructor(private el:ElementRef<HTMLImageElement>) {
    this.htmlElement = el;
    this.defaultHeight = this.htmlElement.nativeElement.style.height;
    this.defaultWidth  = this.htmlElement.nativeElement.style.width;
  }

  @HostListener('mouseover') onMouseOver() {
    this.increaseSize();
    console.log("Estoy sobre la imagen");
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.decreaseSize();
  }

  increaseSize(){
    this.htmlElement.nativeElement.style.height = this._height;
    this.htmlElement.nativeElement.style.width  = this._width;
  }

  decreaseSize(){
    this.htmlElement.nativeElement.style.height = this.defaultHeight;
    this.htmlElement.nativeElement.style.width  = this.defaultWidth;
  }


}

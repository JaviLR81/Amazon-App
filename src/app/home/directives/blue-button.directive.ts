import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBlueButton]'
})
export class BlueButtonDirective {

  @Input('appBlueButton') buttonColor!:string;
  @Input() location: string = 'No provided location';

  constructor(private el:ElementRef<HTMLAnchorElement>) {
    this.highlight(this.buttonColor || 'lowercase');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.buttonColor || 'uppercase');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string | null) {

    if(color == null){
      this.el.nativeElement.style.textTransform = 'lowercase';
    }else{
      this.el.nativeElement.style.textTransform = color;
    }

  }

}

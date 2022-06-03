import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EnlargeImageHoverDirective } from './enlarge-image-hover.directive';

@Component({
  template: `
      <img class="one"    enlargeImageHover>
      <img class="second" enlargeImageHover height="300px" width="200px">
  `
})
class TestComponent {
  conError:boolean = true;
  sinError:boolean = false;
}

describe('EnlargeImageHoverDirective', () => {

  let fixture :ComponentFixture<TestComponent>;
  let des     :DebugElement[];

  beforeEach(() => {

    fixture = TestBed.configureTestingModule({
      declarations: [ EnlargeImageHoverDirective, TestComponent ],
      schemas: [
        // NO_ERRORS_SCHEMA
      ]
    })
    .createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    // all elements with an attached EnlargeImageDirective
    des = fixture.debugElement.queryAll(By.directive(EnlargeImageHoverDirective));
  });

  it('should have two element', () => {
    expect(des.length).toBe(2);
  });


  it('Should change the size from original value to heigh: 5500px and widht: auto on mouseOver', () => {
    const directive = des[0].injector.get(EnlargeImageHoverDirective) as EnlargeImageHoverDirective;
    des[0].triggerEventHandler('mouseover', {});

    const height = des[0].nativeElement.style.height;
    const widht  = des[0].nativeElement.style.width;
    expect(height).toBe('550px');
    expect(widht).toBe('auto');
  });

  it('Should change the size from original value to heigh: 300px and widht: 200px on mouseOver', () => {
    const directive = des[1].injector.get(EnlargeImageHoverDirective) as EnlargeImageHoverDirective;
    des[1].triggerEventHandler('mouseover', {});

    const height = des[1].nativeElement.style.height;
    const widht  = des[1].nativeElement.style.width;
    expect(height).toBe('300px');
    expect(widht).toBe('200px');
  });

});

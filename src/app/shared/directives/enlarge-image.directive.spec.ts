import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EnlargeImageDirective } from './enlarge-image.directive';


@Component({
  template: `
      <img class="one"    enlargeImage>
      <img class="second" enlargeImage height="300px" width="200px">
  `
})
class TestComponent {
}

describe('EnlargeImagesDirective', () => {

  let fixture :ComponentFixture<TestComponent>;
  let des     :DebugElement[];

  beforeEach(() => {

    fixture = TestBed.configureTestingModule({
      declarations: [ EnlargeImageDirective, TestComponent ],
      schemas: [
        // NO_ERRORS_SCHEMA
      ]
    })
    .createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    // all elements with an attached EnlargeImageDirective
    des = fixture.debugElement.queryAll(By.directive(EnlargeImageDirective));
  });

  it('should have one element', () => {
    expect(des.length).toBe(2);
  });

  /**
   * Ejemplo de comparación para tamaños fijos impuestos por la directiva
   */
  it('img one should have measurements, height:500px and width: auto ', () => {
    const elem: HTMLElement = fixture.debugElement.query(By.css('.one')).nativeElement;

    expect(elem.style.height).toBe('550px');
    expect(elem.style.width).toBe('auto');
  });

  it('img one should have measurements, height:300px and width: 200px ', () => {
    const elem: HTMLElement = fixture.debugElement.query(By.css('.second')).nativeElement;

    expect(elem.style.height).toBe('300px');
    expect(elem.style.width).toBe('200px');
  });






});

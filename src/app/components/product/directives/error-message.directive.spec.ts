import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ErrorMessageDirective } from './error-message.directive';

@Component({
  template: `
      <span class="one"    [errorMessage]="conError"></span>
      <span class="second" [errorMessage]="sinError"></span>
  `
})
class TestComponent {
  conError:boolean = true;
  sinError:boolean = false;
}

// TODO: Corregir tests
xdescribe('ErrorMessageDirective', () => {

  let fixture :ComponentFixture<TestComponent>;
  let des     :DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ ErrorMessageDirective, TestComponent ]
    })
    .createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    // all elements with an attached ErrorMessageDirective
    des = fixture.debugElement.queryAll(By.directive(ErrorMessageDirective));
  });

  // tests

  it('should have one element', () => {
    expect(des.length).toBe(2);
  });

  it('should show the text: "El campo presenta errores"', () => {
     const elem: HTMLElement = fixture.debugElement.query(By.css('.one')).nativeElement;
     expect(elem.innerHTML).toContain('El campo presenta errores');
  });

  it('should not show the text: "El campo presenta errores"', () => {
    const elem: HTMLElement = fixture.debugElement.query(By.css('.second')).nativeElement;
    expect(elem.innerHTML).not.toContain('El campo presenta errores');
 });

});

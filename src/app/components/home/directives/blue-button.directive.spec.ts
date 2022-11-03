import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BlueButtonDirective } from './blue-button.directive';


@Component({
  template: `
      <a [appBlueButton]="'capitalize'" location="HomeComponent">Ver</a>
  `
})
class TestComponent { }

describe('BlueButtonDirective', () => {

  let fixture:ComponentFixture<TestComponent>;

  let des:DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ BlueButtonDirective, TestComponent ]
    })
    .createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    // all elements with an attached HighlightDirective
    des = fixture.debugElement.queryAll(By.directive(BlueButtonDirective));
  });


  // tests
  it('should have one element', () => {
    expect(des.length).toBe(1);
  });

});

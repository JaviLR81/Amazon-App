import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductComponent } from './card-product.component';

xdescribe('CardProductComponent', () => {
  let component: CardProductComponent;
  let fixture: ComponentFixture<CardProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

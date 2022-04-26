import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProductEditComponent } from './modal-product-edit.component';

describe('ModalProductEditComponent', () => {
  let component: ModalProductEditComponent;
  let fixture: ComponentFixture<ModalProductEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProductEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { from, of, Subject, throwError } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { ProductService } from '../../services/product/product.service';
import { ProductListComponent } from './product-list.component';

import { Product } from 'src/app/shared/interfaces/product.interface';
import { brandMock, brandsMock } from 'src/app/testing/product-mock';


class FakeActivatedRoute {

  private subject = new Subject();

  push(value: any){
    this.subject.next( value );
  }

  get params(){
    return this.subject.asObservable();
  }
}

describe('ProductListComponent', () => {

  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let ngBModalSpy: jasmine.SpyObj<NgbModal>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {

    productServiceSpy = jasmine.createSpyObj<ProductService>('ProductService',['getProducts','saveProduct','getBrands']);
    ngBModalSpy       = jasmine.createSpyObj<NgbModal>('NgbModal',['dismissAll']);

    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: ActivatedRoute, useClass: FakeActivatedRoute  },
        { provide: ProductService, useValue: productServiceSpy  },
        { provide: NgbModal, useValue: ngBModalSpy  },
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

    // fixture.detectChanges();

    activatedRoute = TestBed.inject(ActivatedRoute);
    (<FakeActivatedRoute>(<any>activatedRoute)).push(of({searchTerm: 'nuevo'}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() method', waitForAsync(() => {

    productServiceSpy.getBrands.and.returnValue( from([brandsMock]) );

    component.ngOnInit();

    expect(component).toBeTruthy();
    expect(productServiceSpy.getBrands).toHaveBeenCalled();
    expect(component.brands.length).toBe(2);
  }));


  it('Check validation fields errors', () => {
    let priceControl = setFormControlValue(component.productForm,'price',123);
    let hasErrors = formControlHasErrors(priceControl!);
    expect(hasErrors).toBeFalsy();

    priceControl?.setValue("");
    hasErrors = formControlHasErrors(priceControl!);
    expect(hasErrors).toBeTruthy();

    priceControl = setFormControlValue(component.productForm,'brand.id',brandMock.id)
    hasErrors = formControlHasErrors(priceControl!);
    expect(hasErrors).toBeFalsy();

    priceControl = setFormControlValue(component.productForm,'brand.id',null)
    hasErrors = formControlHasErrors(priceControl!);
    expect(hasErrors).toBeTruthy();
  });

  it('saveProduct() with invalid form', () => {
    const spy = spyOn(component.productForm,'markAllAsTouched');
    component.saveProduct();
    expect(spy).toHaveBeenCalled();
  });


  it('saveProduct() with invalid form', () => {
    const spy = spyOn(component.productForm,'markAllAsTouched');
    component.saveProduct();
    expect(spy).toHaveBeenCalled();
  });

  it('saveProduct() with valid form', (done:DoneFn) => {

    let product:Product = {} as Product;

    setFormFieldValues(component.productForm);

    productServiceSpy.saveProduct.and.returnValue(of(product));

    component.saveProduct();

    setTimeout(() => {
      expect(Swal.isVisible()).toBeTruthy();
      Swal.clickConfirm();
      done();
    });

    expect(component.productForm.valid).toBeTruthy();
    expect(productServiceSpy.saveProduct).toHaveBeenCalled();
    expect(ngBModalSpy.dismissAll).toHaveBeenCalled();

  });

  it('Test error in saveProduct()', () => {

    setFormFieldValues(component.productForm);

    let spy = spyOn(console,'log');
    productServiceSpy.saveProduct.and.returnValue(throwError(() => ''));

    component.saveProduct();

    expect(spy).toHaveBeenCalledWith('Ha ocurrido un error al tratar de guardar el producto');
  });


  // TODO: Isolate this functions in a place that allows to share beetwen multiple tests

  function formControlHasErrors(formControl: AbstractControl): boolean{
    return (formControl.errors === null) ? false : true;
  }

  function setFormFieldValues(productForm: FormGroup): void {
    productForm.get('name')?.setValue('Apple TV');
    productForm.get('description')?.setValue('Apple TV, the most recent TV in the market');
    productForm.get('price')?.setValue(125);
    productForm.get('brand.id')?.setValue(brandMock.id);
  }

  function setFormControlValue(productForm: FormGroup, fieldName: string, value: any): AbstractControl | null{
    let formControl = productForm.get(fieldName);
    formControl?.setValue(value);
    return formControl;
  }

});

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subject, throwError } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product.interface';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/product/product.service';

import { ProductListComponent } from './product-list.component';

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

    productServiceSpy = jasmine.createSpyObj<ProductService>('ProductService',['getProducts','saveProduct']);
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
    component.ngOnInit();

    expect(component).toBeTruthy();
  }));


  // TODO: Check real implementation
  xit('isAValidField() method', () => {

    let priceControl = component.productForm.get('price');

    priceControl?.setValue(123);
    let result = component.isAValidField('price');
    console.log('price',priceControl?.value);
    console.log('price valid',priceControl?.errors);
    expect(result).toBeFalsy();


    priceControl?.setValue(null);
    result = component.isAValidField('price');
    console.log('price',priceControl?.value);
    console.log('price valid',priceControl?.errors);
    expect(result).toBeNull();
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

    component.productForm.get('name')?.setValue('Apple TV');
    component.productForm.get('description')?.setValue('Apple TV, the most recent TV in the market');
    component.productForm.get('price')?.setValue(125);

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

  it('saveProduct() with valid form', () => {

    component.productForm.get('name')?.setValue('Apple TV');
    component.productForm.get('description')?.setValue('Apple TV, the most recent TV in the market');
    component.productForm.get('price')?.setValue(125);

    let spy = spyOn(console,'log');
    productServiceSpy.saveProduct.and.returnValue(throwError(() => ''));

    component.saveProduct();

    expect(spy).toHaveBeenCalledWith('Ha ocurrido un error al tratar de guardar el producto');
  });

});

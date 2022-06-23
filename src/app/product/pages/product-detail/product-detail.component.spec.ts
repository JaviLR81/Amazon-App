import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subject, throwError } from 'rxjs';
import { Product, Tag } from 'src/app/shared/interfaces/product.interface';
import { NameUniqueValidatorService } from 'src/app/shared/services/validators/name-unique-validator.service';
import { ValidatorService } from 'src/app/shared/services/validators/validator.service';
import { product, products, tag, tags } from 'src/app/testing/product-mock';
import { ModalProductEditService } from '../../services/modal-product-edit/modal-product-edit.service';
import { ProductService } from '../../services/product/product.service';

import { ProductDetailComponent } from './product-detail.component';


class FakeActivatedRoute {

  // Nos permite insertar valores a un observable
  private subject = new Subject();

  // Insertandole el nuevo valor
  push(value: any){
    this.subject.next( value );
  }

  // Regresando la propiedad paramas como un observable Subject()
  get params(){
    return this.subject.asObservable();
  }
}


describe('ProductDetailComponent', () => {

  // Mocks
  let mockTag:Tag;
  let mockTags:Tag[];
  let mockProduct:Product;
  let mockProducts:Product[];


  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  // Jasmine Spies
  let activatedRoute: ActivatedRoute;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let validatorServiceSpy: jasmine.SpyObj<ValidatorService>;
  let nameUniqueValidatorServiceSpy: jasmine.SpyObj<NameUniqueValidatorService>;
  let modalProductEditServiceSpy: jasmine.SpyObj<ModalProductEditService>;
  let ngbModalSpy: jasmine.SpyObj<NgbModal>;
  let formGroupSpy: jasmine.SpyObj<FormGroup>;

  beforeEach(async () => {
    productServiceSpy             = jasmine.createSpyObj<ProductService>('ProductService',['getProductDetail','updateProduct','getTags','getBrands']);
    validatorServiceSpy           = jasmine.createSpyObj<ValidatorService>('ValidatorService',['shouldBeANumber','shouldBeMajorThanZero','descriptionShouldContainName']);
    nameUniqueValidatorServiceSpy = jasmine.createSpyObj<NameUniqueValidatorService>('NameUniqueValidatorService',['validate']);
    modalProductEditServiceSpy    = jasmine.createSpyObj<ModalProductEditService>('ModalProductEditService',['openModal']);
    ngbModalSpy                   = jasmine.createSpyObj<NgbModal>('NgbModal',['open','dismissAll']);
    formGroupSpy                  = jasmine.createSpyObj<FormGroup>('FormGroup',['reset']);

    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      providers: [
        { provide: ProductService            , useValue: productServiceSpy },
        { provide: ActivatedRoute            , useClass: FakeActivatedRoute},
        { provide: NameUniqueValidatorService, useValue: nameUniqueValidatorServiceSpy },
        { provide: ModalProductEditService   , useValue: modalProductEditServiceSpy },
        { provide: FormGroup                 , useValue: formGroupSpy },
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;

    // fixture.detectChanges();

    activatedRoute = TestBed.inject(ActivatedRoute);
    (<FakeActivatedRoute>(<any>activatedRoute)).push({id: '25'});

    // Mocks
    mockProduct = product;
    mockProducts = products;
    mockTag = tag;
    mockTags = tags;

    //
    productServiceSpy.getTags.and.returnValue(of([]));
    productServiceSpy.getBrands.and.returnValue(of([]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openModal() method', () => {
    modalProductEditServiceSpy.openModal.and.returnValue();
    component.openModal();

    expect(modalProductEditServiceSpy.openModal).toHaveBeenCalled();
  });

  it('populateUpdateForm() method', () => {

    component.product = product;
    const espia = spyOn(component.updateForm,'reset');
    component.populateUpdateForm();
    expect(espia).toHaveBeenCalled();
  });

  it('isAValidField() method', () => {
    let priceField = component.updateForm.controls['price'];

    priceField.setValue(125);
    component.updateForm.markAllAsTouched();
    fixture.detectChanges();
    let hasErrors = component.hasValidationErrors('price');
    expect(hasErrors).toBeFalsy();

    priceField.setValue("abc");
    component.updateForm.markAllAsTouched();
    fixture.detectChanges();
    hasErrors = component.hasValidationErrors('price');
    expect(hasErrors).toBeTruthy();
  });

  it('getErrorMsj() method', () => {
    let priceField = component.updateForm.controls['price'];

    priceField.setValue("ABC");
    let msg = component.getErrorMsj('price');
    expect(msg).toBe("El campo debe ser númerico");

    priceField.setValue(null);
    msg = component.getErrorMsj('price');
    expect(msg).toBe("El campo es obligatorio");

    priceField.setValue(0);
    msg = component.getErrorMsj('price');
    expect(msg).toBe("El campo debe ser mayor a cero");
  });

  it('getTags() method', () => {
    productServiceSpy.getTags.and.returnValue(of(mockTags));
    component.getTags();
    expect(productServiceSpy.getTags).toHaveBeenCalled();
    expect(component.tags.length).toBeGreaterThan(0);
  });

  it('getTags() method error', () => {
    productServiceSpy.getTags.and.returnValue(throwError(() => 'Error al cargar las tags'));
    component.getTags();
    expect(productServiceSpy.getTags).toHaveBeenCalled();
    expect(component.tags.length).toBe(0);
  });

});

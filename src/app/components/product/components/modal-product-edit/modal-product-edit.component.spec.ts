import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Product, Tag } from 'src/app/shared/interfaces/product.interface';
import { product, products, tag, tags } from 'src/app/testing/product-mock';
import Swal from 'sweetalert2';
import { ModalProductEditService } from '../../services/modal-product-edit/modal-product-edit.service';
import { ProductService } from '../../services/product/product.service';

import { ModalProductEditComponent } from './modal-product-edit.component';

describe('ModalProductEditComponent', () => {
  let component: ModalProductEditComponent;
  let fixture: ComponentFixture<ModalProductEditComponent>;

  let modalProductEditServiceSpy: jasmine.SpyObj<ModalProductEditService>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  // Mocks

  // Mocks
  let mockTag:Tag;
  let mockTags:Tag[];
  let mockProduct:Product;
  let mockProducts:Product[];


  beforeEach(async () => {

    modalProductEditServiceSpy = jasmine.createSpyObj<ModalProductEditService>('ModalProductEditService',['closeModal','openModal','modal']);
    productServiceSpy = jasmine.createSpyObj<ProductService>('ProductService',['uploadProductImage']);


    await TestBed.configureTestingModule({
      declarations: [ ModalProductEditComponent ],
      imports: [
        RouterTestingModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: ModalProductEditService, useValue: modalProductEditServiceSpy  },
        { provide: ProductService, useValue: productServiceSpy  },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProductEditComponent);
    component = fixture.componentInstance;

    modalProductEditServiceSpy.closeModal.and.returnValue();

    fixture.detectChanges();

    // Mocks
    mockProduct = product;
    mockProducts = products;
    mockTag = tag;
    mockTags = tags;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('seleccionarFoto() with not an image', (done) => {

    const mockFile = new File([''], 'filename', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };

    component.seleccionarFoto(mockEvt);

    expect(component.fotoSeleccionada).toBeNull();

    Swal.clickConfirm();
    setTimeout(() => {
      done();
    });

  });

  it('subirFoto() should call Sweet alert message', (done) => {

    component.fotoSeleccionada = null;
    component.subirFoto();

    setTimeout(() => {
      expect(Swal.isVisible()).toBeTruthy();
      Swal.clickConfirm();
      done();
    });

  });

  // TODO: Check event emitter test
  xit('subirFoto() should call service for upload image', () => {


    productServiceSpy.uploadProductImage.and.returnValue(
      of(mockProduct)
    )

    component.fotoSeleccionada = 'Some-Image';
    component.product = mockProduct;

    component.subirFoto();

    expect(productServiceSpy.uploadProductImage).toHaveBeenCalled();
  });



});

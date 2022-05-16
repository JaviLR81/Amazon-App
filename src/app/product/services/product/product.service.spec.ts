import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { ProductService } from './product.service';

import { Product, Tag } from 'src/app/shared/interfaces/product.interface';
import Swal from 'sweetalert2';



describe('ProductService', () => {
  let service: ProductService;
  let controller: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;
  let _baseURL = environment.baseURL;


  // Mocks

  // Tags

  let mockTag:Tag = {
    id: 1,
    name: 'Cocina',
    createdAt: new Date()
  };

  let mockTags:Tag[] = [mockTag];


  // Product
  let mockNestedProduct = {
    product: {
      id: 1,
      name: 'Samsung',
      image: 'some-image.png',
      description: 'some_description',
      price: 123.5,
      createdAt: new Date(),
      brand: {
        id: 1,
        name: 'Samsung',
        createdAt: new Date()
      },
      tags: mockTags
    }
  };

  let mockProduct: Product = {
    id: 1,
    name: 'Samsung',
    image: 'some-image.png',
    description: 'some_description',
    price: 123.5,
    createdAt: new Date(),
    brand: {
      id: 1,
      name: 'Samsung',
      createdAt: new Date()
    },
    tags: mockTags
  };

  let mockProducts:Product[] = [mockProduct];


  beforeEach(() => {

    routerSpy = jasmine.createSpyObj<Router>('Router',['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(ProductService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach( () => controller.verify() );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProductDetail() method', () => {

    const id = 1;

    service.getProductDetail(id).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });


    const req = controller.expectOne({
      url: `${_baseURL}/products/${id}`,
      method: 'GET'
    })

    req.flush(mockProduct);
  });

  it('can test for 404 error', (done:DoneFn) => {

    const id = 1;
    const emsg = 'deliberate 404 error';

    service.getProductDetail(id).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(emsg);
        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
      },
    });

    const req = controller.expectOne({
      url: `${_baseURL}/products/${id}`,
      method: 'GET'
    });

    setTimeout(() => {
      expect(Swal.isVisible()).toBeTruthy();
      Swal.clickConfirm();
      done();
    });


    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });

  });

  it('uploadProductImage() method', () => {
    const id = 1;
    const mockFile = new File([''], 'filename', { type: 'image/png' });

    service.uploadProductImage(mockFile,id).subscribe(product => {
      expect(product).toEqual(mockProduct);
    })

    let req = controller.expectOne({
      url: `${_baseURL}/products/upload`,
      method: 'POST',
    });

    req.flush(mockNestedProduct);
  });

  it('uploadProductImage() method', () => {
    const id = 1;
    const mockFile = new File([''], 'filename', { type: 'image/png' });

    service.uploadProductImage(mockFile,id).subscribe(product => {
      expect(product).toEqual(mockProduct);
    })

    let req = controller.expectOne({
      url: `${_baseURL}/products/upload`,
      method: 'POST',
    });

    req.flush(mockNestedProduct);
  });

  it('updateProduct() method', () => {
    const id = 1;

    service.updateProduct(id,mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    })

    let req = controller.expectOne({
      url: `${_baseURL}/products/${id}`,
      method: 'PUT',
    });

    req.flush(mockNestedProduct);
  });


  it('getProducts() method', () => {

    service.getProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    })

    let req = controller.expectOne({
      url: `${_baseURL}/products`,
      method: 'GET',
    });

    req.flush(mockProducts);
  });

  it('saveProduct() method', () => {

    let fakeProduct:Product = {} as Product;

    service.saveProduct(fakeProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    })

    let req = controller.expectOne({
      url: `${_baseURL}/products`,
      method: 'POST',
    });

    req.flush(mockNestedProduct);
  });

  it('getTags() method', () => {

    service.getTags().subscribe(tags => {
      expect(tags).toEqual(mockTags);
    })

    let req = controller.expectOne({
      url: `${_baseURL}/products/tags`,
      method: 'GET',
    });

    req.flush(mockTags);
  });






});

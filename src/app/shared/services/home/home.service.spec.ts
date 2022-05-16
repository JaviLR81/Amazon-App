import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HomeService } from './home.service';
import { Product, Tag } from '../../interfaces/product.interface';
import { environment } from 'src/environments/environment';
import { product, products, tag, tags } from 'src/app/testing/product-mock';

describe('HomeService', () => {


  // Mocks
  let mockTag:Tag;
  let mockTags:Tag[];
  let mockProduct:Product;
  let mockProducts:Product[];


  let service: HomeService;
  // We use to specify the URL that we expect the service function to hit
  // as well as the request method to be used
  let httpController: HttpTestingController;
  let _baseURL:string = environment.baseURL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.inject(HomeService);
    httpController = TestBed.inject(HttpTestingController);

    // Mocks
    mockProduct = product;
    mockProducts = products;
    mockTag = tag;
    mockTags = tags;
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call getProducts()', () => {

		  service.getProducts().subscribe((res) => {
	      expect(res).toEqual(mockProducts);
	    });

	    const req = httpController.expectOne({
	      method: 'GET',
	      url: `${_baseURL}/products`,
	    });

	    req.flush(mockProducts);
  });


  it('should call getProducts() headers comprobation', () => {

		  service.getProducts().subscribe(() => {});

	    const req = httpController.expectOne(`${_baseURL}/products`);

      expect(req.request.method).toBe('GET');
      console.log('headers',req.request.headers);

      expect(req.request.headers.has('Authorization')).withContext('Contais authorization header').toBeFalsy();

	    req.flush(mockProducts);
  });





});

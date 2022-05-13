import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HomeService } from './home.service';
import { Product } from '../../interfaces/product.interface';
import { environment } from 'src/environments/environment';

describe('HomeService', () => {


 // Mocks
 let products:Product[] = [{
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
    }
  }];


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
	      expect(res).toEqual(products);
	    });

	    const req = httpController.expectOne({
	      method: 'GET',
	      url: `${_baseURL}/products`,
	    });

	    req.flush(products);
  });


  it('should call getProducts() headers comprobation', () => {

		  service.getProducts().subscribe(() => {});

	    const req = httpController.expectOne(`${_baseURL}/products`);

      expect(req.request.method).toBe('GET');
      console.log('headers',req.request.headers);

      expect(req.request.headers.has('Authorization')).withContext('Contais authorization header').toBeFalsy();

	    req.flush(products);
  });





});

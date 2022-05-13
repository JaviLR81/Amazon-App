import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { from, of, throwError } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { HomeService } from 'src/app/shared/services/home/home.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let homeServiceSpy: jasmine.SpyObj<HomeService>;

  beforeEach(async () => {

    homeServiceSpy = jasmine.createSpyObj<HomeService>('HomeService',['getProducts']);

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        RouterTestingModule
      ],
      providers:[
        {provide:HomeService, useValue: homeServiceSpy}
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call getProducts in HomeServie', () => {

    let product: Product = {
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
    }

    let products:Product[] = [product,product];

    homeServiceSpy.getProducts.and.returnValue(of(products));

    component.ngOnInit();

    expect(homeServiceSpy.getProducts).toHaveBeenCalled();
    expect(component.products.length).toBeGreaterThan(0);
  });


  it('should call console.log in getProducts', () => {

    spyOn(console,'log').and.callThrough();

    homeServiceSpy.getProducts.and.returnValue(
      throwError(() => '')
    );

    component.ngOnInit();

    expect(console.log).toHaveBeenCalled();
  });




});

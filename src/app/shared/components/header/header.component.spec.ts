import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { HeaderComponent } from './header.component';



class FakeRouter {
  navigate(params:any){}

  navigateByUrl(params:any){}
}


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [

      ],
      providers: [
        {
          provide: Router, useClass: FakeRouter
        }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('testing getter', () => {
    let array = component.searchHistory;

    expect(array.length).toBe(0);
    expect(array instanceof Array).toBeTruthy();
  });

  it('search() method', () => {
    component.searchTerm = 'Leo Messi';

    component.search();

    expect(component.searchHistory).toContain('leo messi');
    expect(component.searchTerm).toBe('');
  });

  it('search() should not include the search term', () => {
    component.searchTerm = '';

    component.search();

    expect(component.searchHistory).not.toContain('');
  });

  it('debouncer should call the next() method', () => {

    let searchTerm = 'Hola';

    component.searchTerm = searchTerm;

    const espia =  spyOn(component.debouncer,'next');

    component.searchSuggestions();

    expect(espia).toHaveBeenCalledWith(searchTerm);
  });

});

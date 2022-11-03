import { TestBed } from '@angular/core/testing';

import { ModalProductEditService } from './modal-product-edit.service';

describe('ModalProductEditService', () => {
  let service: ModalProductEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalProductEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

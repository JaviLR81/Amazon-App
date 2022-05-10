import { TestBed } from '@angular/core/testing';

import { NameUniqueValidatorService } from './name-unique-validator.service';

describe('NameUniqueValidatorService', () => {
  let service: NameUniqueValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameUniqueValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { HeaderSubjectService } from './header-subject.service';

fdescribe('HeaderSubjectService', () => {
  let service: HeaderSubjectService;
  let subjectSpy: jasmine.SpyObj<Subject<string>>;

  beforeEach(() => {

    subjectSpy = jasmine.createSpyObj<Subject<string>>('Subject',['next']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers:[
        {provide:Subject, useValue: subjectSpy}
      ],
    });
    service = TestBed.inject(HeaderSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});

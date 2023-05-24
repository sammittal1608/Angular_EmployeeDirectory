import { TestBed } from '@angular/core/testing';

import { DeleteemployeeService } from './deleteemployee.service';

describe('DeleteemployeeService', () => {
  let service: DeleteemployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteemployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

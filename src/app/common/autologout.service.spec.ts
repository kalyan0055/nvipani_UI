import { TestBed, inject } from '@angular/core/testing';

import { AutologoutService } from './autologout.service';

describe('AutologoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutologoutService]
    });
  });

  it('should be created', inject([AutologoutService], (service: AutologoutService) => {
    expect(service).toBeTruthy();
  }));
});

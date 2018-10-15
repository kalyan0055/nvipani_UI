import { TestBed, inject } from '@angular/core/testing';

import { UisettingsService } from './uisettings.service';

describe('UisettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UisettingsService]
    });
  });

  it('should be created', inject([UisettingsService], (service: UisettingsService) => {
    expect(service).toBeTruthy();
  }));
});

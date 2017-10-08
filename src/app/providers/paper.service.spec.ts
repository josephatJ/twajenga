import { TestBed, inject } from '@angular/core/testing';

import { PaperService } from './paper.service';

describe('PaperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaperService]
    });
  });

  it('should be created', inject([PaperService], (service: PaperService) => {
    expect(service).toBeTruthy();
  }));
});

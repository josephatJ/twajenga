import { TestBed, inject } from '@angular/core/testing';

import { FaqsService } from './faqs.service';

describe('FaqsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaqsService]
    });
  });

  it('should be created', inject([FaqsService], (service: FaqsService) => {
    expect(service).toBeTruthy();
  }));
});

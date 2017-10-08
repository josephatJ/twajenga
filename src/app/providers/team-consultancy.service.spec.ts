import { TestBed, inject } from '@angular/core/testing';

import { TeamConsultancyService } from './team-consultancy.service';

describe('TeamConsultancyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamConsultancyService]
    });
  });

  it('should be created', inject([TeamConsultancyService], (service: TeamConsultancyService) => {
    expect(service).toBeTruthy();
  }));
});

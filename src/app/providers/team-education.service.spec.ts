import { TestBed, inject } from '@angular/core/testing';

import { TeamEducationService } from './team-education.service';

describe('TeamEducationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamEducationService]
    });
  });

  it('should be created', inject([TeamEducationService], (service: TeamEducationService) => {
    expect(service).toBeTruthy();
  }));
});

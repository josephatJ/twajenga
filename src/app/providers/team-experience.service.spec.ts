import { TestBed, inject } from '@angular/core/testing';

import { TeamExperienceService } from './team-experience.service';

describe('TeamExperienceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamExperienceService]
    });
  });

  it('should be created', inject([TeamExperienceService], (service: TeamExperienceService) => {
    expect(service).toBeTruthy();
  }));
});

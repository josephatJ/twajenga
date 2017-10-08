import { TestBed, inject } from '@angular/core/testing';

import { MemberContactsService } from './member-contacts.service';

describe('MemberContactsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberContactsService]
    });
  });

  it('should be created', inject([MemberContactsService], (service: MemberContactsService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { PersonalIn4Service } from './personal-in4.service';

describe('PersonalIn4Service', () => {
  let service: PersonalIn4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalIn4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

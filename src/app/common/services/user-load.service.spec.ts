import { TestBed } from '@angular/core/testing';

import { UserLoadService } from './user-load.service';

describe('UserLoadService', () => {
  let service: UserLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

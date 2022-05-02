import { TestBed } from '@angular/core/testing';

import { TeamsLoadService } from './teams-load.service';

describe('TeamsLoadService', () => {
  let service: TeamsLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamsLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SchoolGroupService } from './school-group.service';

describe('SchoolGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolGroupService = TestBed.get(SchoolGroupService);
    expect(service).toBeTruthy();
  });
});

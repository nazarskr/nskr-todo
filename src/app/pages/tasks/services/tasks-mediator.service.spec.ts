import { TestBed } from '@angular/core/testing';

import { TasksMediatorService } from './tasks-mediator.service';

describe('TasksMediatorService', () => {
  let service: TasksMediatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksMediatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

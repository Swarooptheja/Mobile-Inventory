import { TestBed } from '@angular/core/testing';

import { BodyParamsService } from './body-params.service';

describe('BodyParamsService', () => {
  let service: BodyParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

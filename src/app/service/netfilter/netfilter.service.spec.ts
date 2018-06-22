import {inject, TestBed} from '@angular/core/testing';

import {NetfilterService} from './netfilter.service';

describe('NetfilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetfilterService]
    });
  });

  it('should be created', inject([NetfilterService], (service: NetfilterService) => {
    expect(service).toBeTruthy();
  }));
});

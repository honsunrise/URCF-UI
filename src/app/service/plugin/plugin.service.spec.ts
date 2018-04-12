import {inject, TestBed} from '@angular/core/testing';

import {PluginService} from './plugin.service';

describe('PluginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PluginService]
    });
  });

  it('should be created', inject([PluginService], (service: PluginService) => {
    expect(service).toBeTruthy();
  }));
});

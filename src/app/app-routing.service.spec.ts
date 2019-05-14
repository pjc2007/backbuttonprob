import { TestBed } from '@angular/core/testing';

import { AppRoutingService } from './app-routing.service';

describe('AppRoutingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppRoutingService = TestBed.get(AppRoutingService);
    expect(service).toBeTruthy();
  });
});

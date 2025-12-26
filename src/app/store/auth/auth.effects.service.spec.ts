import { TestBed } from '@angular/core/testing';

import { AuthEffectsService } from './auth.effects.service';

describe('AuthEffectsService', () => {
  let service: AuthEffectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthEffectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

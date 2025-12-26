import { TestBed } from '@angular/core/testing';

import { LoginGuard } from './login.service';

describe('LoginService', () => {
  let service: LoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

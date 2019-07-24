import { TestBed } from '@angular/core/testing';

import { HTTPInterceptorBasicAuthService } from './httpinterceptor-basic-auth.service';

describe('HTTPInterceptorBasicAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HTTPInterceptorBasicAuthService = TestBed.get(HTTPInterceptorBasicAuthService);
    expect(service).toBeTruthy();
  });
});

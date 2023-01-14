import { TestBed } from '@angular/core/testing';

import { ClientAccountServicService } from './client-account-servic.service';

describe('ClientAccountServicService', () => {
  let service: ClientAccountServicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientAccountServicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

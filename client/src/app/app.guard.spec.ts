import { TestBed, async, inject } from '@angular/core/testing';

import { AppGuard } from './app.guard';

describe('AppGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppGuard]
    });
  });

  it('should ...', inject([AppGuard], (guard: AppGuard) => {
    expect(guard).toBeTruthy();
  }));
});

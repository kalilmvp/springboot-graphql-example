import { TestBed } from '@angular/core/testing';

import { CarService } from './car.service';

describe('CarsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarService = TestBed.get(CarService);
    expect(service).toBeTruthy();
  });
});

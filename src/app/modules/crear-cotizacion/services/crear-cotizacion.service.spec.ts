import { TestBed } from '@angular/core/testing';

import { CrearCotizacionService } from './crear-cotizacion.service';

describe('CrearCotizacionService', () => {
  let service: CrearCotizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearCotizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

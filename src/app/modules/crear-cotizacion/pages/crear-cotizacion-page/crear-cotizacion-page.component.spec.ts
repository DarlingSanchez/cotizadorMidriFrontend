import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCotizacionPageComponent } from './crear-cotizacion-page.component';

describe('CrearCotizacionPageComponent', () => {
  let component: CrearCotizacionPageComponent;
  let fixture: ComponentFixture<CrearCotizacionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCotizacionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCotizacionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

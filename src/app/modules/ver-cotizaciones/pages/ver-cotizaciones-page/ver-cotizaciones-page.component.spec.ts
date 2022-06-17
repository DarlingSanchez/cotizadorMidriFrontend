import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCotizacionesPageComponent } from './ver-cotizaciones-page.component';

describe('VerCotizacionesPageComponent', () => {
  let component: VerCotizacionesPageComponent;
  let fixture: ComponentFixture<VerCotizacionesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerCotizacionesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCotizacionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

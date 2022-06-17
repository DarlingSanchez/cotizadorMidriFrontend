import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerCotizacionesRoutingModule } from './ver-cotizaciones-routing.module';
import { VerCotizacionesPageComponent } from './pages/ver-cotizaciones-page/ver-cotizaciones-page.component';


@NgModule({
  declarations: [
    VerCotizacionesPageComponent
  ],
  imports: [
    CommonModule,
    VerCotizacionesRoutingModule
  ]
})
export class VerCotizacionesModule { }

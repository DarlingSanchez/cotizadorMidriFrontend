import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearCotizacionRoutingModule } from './crear-cotizacion-routing.module';
import { CrearCotizacionPageComponent } from './pages/crear-cotizacion-page/crear-cotizacion-page.component';


@NgModule({
  declarations: [
    CrearCotizacionPageComponent
  ],
  imports: [
    CommonModule,
    CrearCotizacionRoutingModule
  ]
})
export class CrearCotizacionModule { }

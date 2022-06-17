import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCotizacionPageComponent } from './pages/crear-cotizacion-page/crear-cotizacion-page.component';

const routes: Routes = [
  {
    path:'',
    component:CrearCotizacionPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearCotizacionRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerCotizacionesPageComponent } from './pages/ver-cotizaciones-page/ver-cotizaciones-page.component';

const routes: Routes = [
  {
    path:'',
    component:VerCotizacionesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerCotizacionesRoutingModule { }

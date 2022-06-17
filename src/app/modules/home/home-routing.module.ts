import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ClientesModule } from '../clientes/clientes.module';


const routes: Routes = [
  {
    path:'',
    loadChildren:()=> import('@modules/dash/dash.module').then(m=>m.DashModule)
  },
  {
    path:'clientes',
    loadChildren:()=> import('@modules/clientes/clientes.module').then(m=>m.ClientesModule)
  },
  {
    path:'productos',
    loadChildren:()=> import('../productos/productos.module').then(m=> m.ProductosModule)
  },
  {
    path:'crear-cotizacion',
    loadChildren:()=>import('../crear-cotizacion/crear-cotizacion.module').then(m=>m.CrearCotizacionModule)
  },
  {
    path:'ver-cotizaciones',
    loadChildren:()=> import('../ver-cotizaciones/ver-cotizaciones.module').then(m=>m.VerCotizacionesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

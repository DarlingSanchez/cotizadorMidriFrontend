import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesPageComponent } from './pages/clientes-page/clientes-page.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    ClientesPageComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MatSliderModule,
    MatTableModule
  ]
})
export class ClientesModule { }

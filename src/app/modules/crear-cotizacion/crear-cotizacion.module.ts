import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearCotizacionRoutingModule } from './crear-cotizacion-routing.module';
import { CrearCotizacionPageComponent } from './pages/crear-cotizacion-page/crear-cotizacion-page.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';





@NgModule({
  declarations: [
    CrearCotizacionPageComponent,
  ],
  imports: [
    CommonModule,
    CrearCotizacionRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatButtonToggleModule,
    MatPseudoCheckboxModule,
    MatExpansionModule,
    MatRadioModule
  ]
})
export class CrearCotizacionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerCotizacionesRoutingModule } from './ver-cotizaciones-routing.module';
import { VerCotizacionesPageComponent } from './pages/ver-cotizaciones-page/ver-cotizaciones-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    VerCotizacionesPageComponent
  ],
  imports: [
    CommonModule,
    VerCotizacionesRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule
  ]
})
export class VerCotizacionesModule { }

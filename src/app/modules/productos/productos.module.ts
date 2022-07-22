import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosPageComponent } from './pages/productos-page/productos-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { DialogPreviewComponent } from './dialogpreview/dialog-preview/dialog-preview.component';


@NgModule({
  declarations: [
    ProductosPageComponent,
    DialogPreviewComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule
  ]
})
export class ProductosModule { }

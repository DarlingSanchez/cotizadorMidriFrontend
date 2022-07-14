import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesPageComponent } from './pages/clientes-page/clientes-page.component';

import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogClientesComponent } from './dialog/dialog-clientes/dialog-clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './message/message/message.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DialogEditClienteComponent } from './dialog/dialog-edit-cliente/dialog-edit-cliente.component';




@NgModule({
  declarations: [
    ClientesPageComponent,    
    DialogClientesComponent, MessageComponent, DialogEditClienteComponent
  ],
  entryComponents:[
    DialogClientesComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
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
export class ClientesModule { }

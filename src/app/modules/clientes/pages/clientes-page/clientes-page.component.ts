import { Component, OnInit } from '@angular/core';
import { dataClientes } from '../../../../data/clientes';
import { ClientesModels } from '../../../../core/models/clientes.model';



@Component({
  selector: 'app-clientes-page',
  templateUrl: './clientes-page.component.html',
  styleUrls: ['./clientes-page.component.css']
})
export class ClientesPageComponent implements OnInit {
  clientes: ClientesModels[] =[]

  displayedColumns: string[] = ['logo','nombre', 'ubicacion', 'representante','correo','editar'];

  constructor() { }

  ngOnInit(): void {
    this.clientes = dataClientes;
  }

}

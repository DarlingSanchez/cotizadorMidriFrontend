import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { dataClientes } from '../../../../data/clientes';
import * as dataRow from '../../../../data/clientes.json';
import { ClientesModels } from '../../../../core/models/clientes.model';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-clientes-page',
  templateUrl: './clientes-page.component.html',
  styleUrls: ['./clientes-page.component.css']
})
export class ClientesPageComponent implements  AfterViewInit {
  //clientes: ClientesModels[] =[]

  displayedColumns: string[] = ['logo','id','nombre', 'ubicacion', 'representante','editar'];
  clientes: MatTableDataSource<ClientesModels>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() { 
    this.clientes = new MatTableDataSource(dataClientes);
  }

  ngOnInit(): void {
   
  }
  ngAfterViewInit() {
    this.clientes.paginator = this.paginator;
    this.clientes.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clientes.filter = filterValue.trim().toLowerCase();

    if (this.clientes.paginator) {
      this.clientes.paginator.firstPage();
    }
  }

}

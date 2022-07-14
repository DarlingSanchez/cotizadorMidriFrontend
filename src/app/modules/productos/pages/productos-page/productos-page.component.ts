import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MediaMixModels } from '@core/models/mediaMix.model';
import { ProductoService } from '@modules/productos/services/producto.service';

@Component({
  selector: 'app-productos-page',
  templateUrl: './productos-page.component.html',
  styleUrls: ['./productos-page.component.css']
})
export class ProductosPageComponent implements OnInit {

  displayedColumns: string[] = ['nombreMediaMix', 'entregable', 'tarifa','preview'];

  productos!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {    
    this.productoService.getProductos$()
    .subscribe((data=>{
      //this.reloadClientes();
      console.log(data)
      setTimeout(()=>{
        this.productos = new MatTableDataSource(data);
        this.productos.paginator = this.paginator;
        this.productos.sort = this.sort;
      },100)
      
    }))
  }
  applyFilter(event:Event):void{

  }

}

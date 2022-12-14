import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, _closeDialogVia} from '@angular/material/dialog'; 
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MediaMixModels } from '@core/models/mediaMix.model';
import { ProductoService } from '@modules/productos/services/producto.service';
import { DialogPreviewComponent } from '../../dialogpreview/dialog-preview/dialog-preview.component';

@Component({
  selector: 'app-productos-page',
  templateUrl: './productos-page.component.html',
  styleUrls: ['./productos-page.component.css']
})
export class ProductosPageComponent implements OnInit {

  displayedColumns: string[] = ['nombreMediaMix', 'entregable', 'tarifa','preview'];

  dialogRef!: MatDialogRef<any>
  
  productos!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productoService: ProductoService, public dialog: MatDialog) { }

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

  previewProduct(event:any):void{
    let id = event.currentTarget.id
    //console.log(event.currentTarget.id)
    let nombreInput = document.getElementById(`${id}-nombre`);
    let descripcionInput = document.getElementById(`${id}-descripcion`);
    let previewInput = document.getElementById(`${id}-preview`);


     let nombre = (nombreInput as HTMLInputElement).value
     let descripcion = (descripcionInput as HTMLInputElement).value
     let preview = (previewInput as HTMLInputElement).value
    

    this.dialogRef =  this.dialog.open(DialogPreviewComponent,{
      data:{
        nombre:nombre,
        descripcion:descripcion,
        preview:preview
     },
      width:"80%"
    });
  }

}

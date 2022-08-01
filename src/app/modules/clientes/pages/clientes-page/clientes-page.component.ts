import { Component, ViewChild, AfterViewInit  } from '@angular/core';
//import { dataClientes } from '../../../../data/clientes';
import * as dataRow from '../../../../data/clientes.json';
import { ClientesModels } from '../../../../core/models/clientes.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, _closeDialogVia} from '@angular/material/dialog'; 

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogClientesComponent } from '../../dialog/dialog-clientes/dialog-clientes.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../../message/message/message.component';
import { Dialog } from '@angular/cdk/dialog';
import { ClientesService } from '@modules/clientes/services/clientes.service';
import { environment } from 'src/environments/environment';
import { DialogEditClienteComponent } from '../../dialog/dialog-edit-cliente/dialog-edit-cliente.component';
import { Router } from '@angular/router';
import { CheckSessionService } from '@core/checkSession/check-session.service';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-clientes-page',
  templateUrl: './clientes-page.component.html',
  styleUrls: ['./clientes-page.component.css']
})
export class ClientesPageComponent implements  AfterViewInit {
  
  private URL = environment.api;

  rutaImg = " ";
  
  dialogRef!: MatDialogRef<any>
  dialogEdit!: MatDialogRef<any>

  agregarCliente() {

    if(this.checkSesion.checkCookieSession()){
 
    
    this.dialogRef =  this.dialog.open(DialogClientesComponent,{width:"80%"});

    
    this.dialogRef.afterClosed().subscribe((result) =>{
        try{
          if(result!="false"){ //SERA FALSE CUANDO SE PRECIONE EL BOTON CANCELAR
          
            this.clientesService.guardarCliente(result, this.clientesService.getImagen())
              .subscribe(responseOk =>{
                  //console.log("Registro correcto", responseOk);  
                  this.openSnackBar("Cliente Agregado con éxito"); 
                  this.reloadClientes();
              }, err=>{            
                console.log("Datos incorrectos", err);  
                this.openSnackBar("Ocurrio un error al guardar los datos");           
              })       
          }else{
            //console.log("Cerrado");
          }
        } catch (error) {
        
        }  
    }) 
  }else{
    this.router.navigate(['/','login']);
  }
  }

dataEditCliente:any = {}
idCliente:number = 0

setId(value:number):void{
  this.idCliente = value;
}
getId():number{
  return this.idCliente;
}

  editarCliente(id:number) {
    if(this.checkSesion.checkCookieSession()){
    this.setId(id);
     this.clientesService.getCliente$(id)
     .subscribe((cliente=>{   //ME SUSCRIBO PARA OBTENER EL CLIENTE DEL ID ENVIADO   
       this.dataEditCliente = cliente;
     }))
     

     setTimeout(() => {
      this.dialogEdit =  this.dialog.open(DialogEditClienteComponent,
        { 
          data:{
             nombreEmpresa:this.dataEditCliente.nombreEmpresa,
             ubicacion:this.dataEditCliente.ubicacion,
             representante:this.dataEditCliente.representante,
             correo:this.dataEditCliente.correo,
             telefono:this.dataEditCliente.telefono,
             ejecutivo:this.dataEditCliente.ejecutivo,
             correoEjecutivo:this.dataEditCliente.correoEjecutivo,
             categoria:this.dataEditCliente.categoria,
             logo: this.rutaImg + this.dataEditCliente.logo
          },
          width:"80%"
        }     
        );
       
      this.dialogEdit.afterClosed().subscribe((cliente) =>{
       try {
        if(cliente!="false"){ //SERA FALSE CUANDO SE PRECIONE EL BOTON CANCELAR
          //console.table(typeof(cliente))
          this.clientesService.updateCliente$(this.getId(), cliente)
              .subscribe(responseOk =>{
                  //console.log("Registro correcto", responseOk);  
                  //console.dir(responseOk)
                  //console.log("Datos ",responseOk)
                  this.openSnackBar("Cliente modificado con éxito"); 
                  this.reloadClientes();
              }, err=>{            
                console.log("Datos incorrectos", err);   
                this.openSnackBar("Ocurrio un error al modificar los datos");            
              })       
        }else{
          //console.log("Cerrado");
        }
       } catch (error) {
        
       }        
      }) 
    }, 1500)
   
    }else{
      this.router.navigate(['/','login']);
    }    
  }
  

  //clientes: ClientesModels[] =[]

  displayedColumns: string[] = ['logo','nombre', 'direccion', 'representante','correo','ejecutivo','correoEjecutivo','editar'];
  clientes!: MatTableDataSource<ClientesModels>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private message:MatSnackBar, private clientesService:ClientesService, private router:Router, private checkSesion:CheckSessionService) { 
    const {dataClientes}:any = (dataRow as any).default

    
    this.rutaImg = environment.rutaImg;
    //this.clientes = new MatTableDataSource(dataClientes);
    //console.log("Valor de data" + data);
  }

  openSnackBar(mensaje:string) {
    this.message.openFromComponent(MessageComponent, { //MENSAJE DE CONFIRMACION QUE SE AGREGO UN NUEVO CLIENTE
      duration: 5 * 1000,
      data: {mensaje:mensaje}
    });
  }

  ngOnInit(): void {
    this.clientesService.getClientes$()
    .subscribe((data=>{
      this.reloadClientes();
      //console.log(data)
      this.clientes = new MatTableDataSource(data);
      this.clientes.paginator = this.paginator;
      this.clientes.sort = this.sort;
    }))
    
  }
  reloadClientes():void{
    this.clientesService.getClientes$()
    .subscribe((data=>{
      //console.log(data)
      this.clientes = new MatTableDataSource(data);
      this.clientes.paginator = this.paginator;
      this.clientes.sort = this.sort;
    }))
  }
  ngAfterViewInit() {
    // this.clientes.paginator = this.paginator;
    // this.clientes.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clientes.filter = filterValue.trim().toLowerCase();

    if (this.clientes.paginator) {
      this.clientes.paginator.firstPage();
    }
  }

}

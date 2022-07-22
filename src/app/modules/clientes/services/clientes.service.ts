import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  response:Object = {}

  imageName!:File;

  private readonly URL = environment.api;

  constructor(private http: HttpClient) { }



  cargarImagen(image:File){
    this.imageName = image;
  }
   getImagen():File{
    return this.imageName;
   }
   
  guardarCliente(data:any, image:any):Observable<any>{
      let body = new FormData;
      body.append('nombreEmpresa', data.empresa as any);
      body.append('ubicacion', data.direccion as any);
      body.append('representante', data.representante as any);
      body.append('correo', data.correo as any);
      body.append('telefono', data.telefono as any);
      body.append('ejecutivo', data.ejecutivo as any);
      body.append('correoEjecutivo', data.correoEjecutivo as any);
      body.append('categoria', data.categoria as any);
      body.append('logo', image as any);
      
      console.table(body);
      return this.http.post(`${this.URL}/v1/clientes`,body);
  }

  getClientes$():Observable<any>{    
    return this.http.get(`${this.URL}/v1/clientes`)
      .pipe(
        map(({data}:any)=>{
          return data;
        })
      )
  }

  getCliente$(id:number):Observable<any>{    
    return this.http.get(`${this.URL}/v1/clientes/${id}`)      
  }

  
  updateCliente$(id:number,data:any):Observable<any>{

     let cliente = new FormData;
      cliente.append('id', id.toString());
      cliente.append('nombreEmpresa', data.empresa);
      cliente.append('ubicacion', data.direccion);
      cliente.append('representante', data.representante);
      cliente.append('correo', data.correo);
      cliente.append('telefono', data.telefono);
      cliente.append('ejecutivo', data.ejecutivo);
      cliente.append('correoEjecutivo', data.correoEjecutivo);
      cliente.append('categoria', data.categoria);
      cliente.append('logo', this.getImagen())

    return this.http.post(`${this.URL}/v1/clientes/update`,cliente);
}
}

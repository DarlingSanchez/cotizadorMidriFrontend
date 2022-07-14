import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private URL = environment.api;
  constructor(private http: HttpClient) { }


  getProductos$():Observable<any>{
    return this.http.get(`${this.URL}/v1/productos`)
      .pipe(
        map(({data}:any)=>{
          return data;
        })
      )
  }
}

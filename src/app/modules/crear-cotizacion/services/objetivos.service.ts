import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObjetivosService {

  private URL = environment.api;
  constructor(private http: HttpClient) { }


  getObjetivos$():Observable<any>{
    return this.http.get(`${this.URL}/v1/objetivos`)
      .pipe(
        map(({data}:any)=>{
          return data;
        })
      )
  }
  getObjetivo$(id:number):Observable<any>{    
    return this.http.get(`${this.URL}/v1/objetivos/${id}`)      
  }
}

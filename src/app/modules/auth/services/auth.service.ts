import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  response:Object = {}

  private readonly URL = environment.api;

  constructor(private http: HttpClient) { }

  
  sendCredentials(email:string, password:string):Observable<any>{
      let body = new FormData;
      body.append('email', email as any);
      body.append('password', password as any);
      return this.http.post(`${this.URL}/login`,body);
  }
  sendRegistro(data:any):Observable<any>{
    let body = new FormData;
    body.append('name', data.name as any);
    body.append('email', data.email as any);
    body.append('password', data.password as any);
    body.append('password_confirmation', data.password_confirmation as any);
    
    
    return this.http.post(`${this.URL}/register`,body);
}
}

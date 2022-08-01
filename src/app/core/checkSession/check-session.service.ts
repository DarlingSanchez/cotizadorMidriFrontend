import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CheckSessionService {

  constructor(private cookie:CookieService, private router:Router) { }
  checkCookieSession():boolean{
    try {
      const token = this.cookie.check('token');
      if(!token){
        return false;
      }
      return token;
      
    } catch (error) {
      return false;
    }
  }
}

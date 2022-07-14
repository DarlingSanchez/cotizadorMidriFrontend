import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  public idUser!:number;
  public nameUser!:string;
  constructor() { }

  setUser(idUser:number, nameUser:string):void{
    this.idUser = idUser;
    this.nameUser = nameUser;
  }

  getUser():Array<any>{
    let data = [
      this.idUser,
      this.nameUser
    ]
    return data;
  }
}

import { Component, OnInit } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { navbarData } from '@shared/components/sidenav/side-nav/dataNav';
import { CheckSessionService } from '../../../../core/checkSession/check-session.service';

@Component({
  selector: 'app-dash-page',
  templateUrl: './dash-page.component.html',
  styleUrls: ['./dash-page.component.css']
})
export class DashPageComponent implements OnInit {

  fecha = new Date();

  dia:number=0;
  mes:number=0;
  anio:number=0;

  navData = navbarData;
  cont:number = 0;
  constructor(private router:Router, private checkSesion:CheckSessionService) { }

  ngOnInit(): void {
    this.dia = this.fecha.getDate();
    this.mes = this.fecha.getMonth();
    this.anio = this.fecha.getFullYear();
  }

  obBack(event:any):void{
      
      let ruta = event.target.name.split(',')
      
      if(this.checkSesion.checkCookieSession()){
        this.router.navigate(ruta);
      }else{
        this.router.navigate(['/','login']);
      }
      
  }

}


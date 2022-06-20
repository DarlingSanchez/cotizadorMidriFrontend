import { Component, OnInit } from '@angular/core';
import { navbarData } from '@shared/components/sidenav/side-nav/dataNav';

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
  constructor() { }

  ngOnInit(): void {
    this.dia = this.fecha.getDate();
    this.mes = this.fecha.getMonth();
    this.anio = this.fecha.getFullYear();
  }

}

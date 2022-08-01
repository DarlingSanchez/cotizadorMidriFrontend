import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-cotizaciones-page',
  templateUrl: './ver-cotizaciones-page.component.html',
  styleUrls: ['./ver-cotizaciones-page.component.css']
})
export class VerCotizacionesPageComponent implements OnInit {

  cotizaciones:Array<any>= []
  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event:any){}
}

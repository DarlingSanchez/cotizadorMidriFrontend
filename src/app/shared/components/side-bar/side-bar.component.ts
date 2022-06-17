import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  mainMenu: {
    defaultOptions: Array<any>, accessLink: Array<any>
  } = { defaultOptions: [], accessLink: [] }



  constructor(private router:Router) { }

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'fa fa-home',
        router: ['/']
      },
      {
        name: 'Clientes',
        icon: 'fa fa-users',
        router: ['/', 'clientes']
      },
      {
        name: 'Productos',
        icon: 'fal fa-box-open',
        router: ['/', 'productos']
        //query: { hola: 'mundo' } PASANDO PARAMTROS A LA URL 
      }
    ]

    this.mainMenu.accessLink = [
      {
        name: 'Generar Cotización',
        icon: 'fa fa-file',
        router: ['/','crear-cotizacion']
      },
      {
        name: 'Ver Cotizaciones',
        icon: 'fa fa-th',
        router: ['/','ver-cotizaciones']
      }
    ]
  }

}

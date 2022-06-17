import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

interface SideNavToggle{
  screenWidth:number;
  collapsed: boolean;
}

const navbarData=[
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
  },
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
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  
  @HostListener('window:resize', ['$event'])
  onResize(event:any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <=768){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth});
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  screenWidth = 0;
  collapsed = false;
  navData = navbarData;
  toggleCollapse():void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth});
  }
  closeSidenav(){
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth});
  }
}

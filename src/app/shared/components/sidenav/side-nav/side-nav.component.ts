import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './dataNav';

interface SideNavToggle{
  screenWidth:number;
  collapsed: boolean;
}


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  
  // @HostListener('window:resize', ['$event'])
  // onResize(event:any){
  //   this.screenWidth = window.innerWidth;
  //   if(this.screenWidth <=768){
  //     this.collapsed = false;
  //     this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth});
  //   }
  // }

  constructor() { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  screenWidth = 0;
  collapsed = true;
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

import { Component,Input, OnInit } from '@angular/core';
interface SideNavToggle{
  screenWidth:number;
  collapsed: boolean;
}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  isSideNavCollapsed=false;
  screenWidth=0;
  onToggleSideNav(data:SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  constructor() { }

  ngOnInit(): void {
  }
  @Input() collapsed = false;
  //@Input() screenWidth = 0;

  getBodyClass():string{
    let styleClass ='';
    if(this.collapsed && this.screenWidth>768){
      styleClass="body-trimmed";
    }else if(this.collapsed && this.screenWidth<=768 && this.screenWidth > 0){
      styleClass="body-md-trimmed";
    }
    return styleClass;
  }

}

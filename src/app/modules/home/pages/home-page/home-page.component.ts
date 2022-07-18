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
  collapsed2:boolean = true;
  screenWidth2:number = 0;

  datosScreen!:SideNavToggle[]

  setScreen(value:number, trueOrFalse:boolean):void{
    this.collapsed2 = trueOrFalse;
    this.screenWidth2 = value;
  }

  getScreen():any[]{
    let data = [
      this.screenWidth2,
      this.collapsed2
    ]
    //this.datosScreen.push(data);

    return  data;
  }
  //screenWidth=0;
  onToggleSideNav(data:SideNavToggle):void{
    // this.screenWidth = data.screenWidth;
    // this.isSideNavCollapsed = data.collapsed;
    
    this.setScreen(data.screenWidth,data.collapsed);
  }
  constructor() { }

  ngOnInit(): void {
  }
  // @Input() collapsed = false;
  // @Input() screenWidth = 0;
  
  getBodyClass():string{
    let styleClass ='';
    let collapsed = this.getScreen()[1]
    let screenWidth = this.getScreen()[0]
    
    if(collapsed && screenWidth>768){
      styleClass="body-trimmed";
    }else if(collapsed && screenWidth<=768 && screenWidth > 0){
      styleClass="body-md-trimmed";
    }
    return styleClass;
  }

}

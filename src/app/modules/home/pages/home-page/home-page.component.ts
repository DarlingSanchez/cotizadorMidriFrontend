import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() collapsed = false;
  @Input() screenWidth = 0;

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

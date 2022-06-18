import { Component, OnInit } from '@angular/core';
import { navbarData } from '@shared/components/sidenav/side-nav/dataNav';

@Component({
  selector: 'app-dash-page',
  templateUrl: './dash-page.component.html',
  styleUrls: ['./dash-page.component.css']
})
export class DashPageComponent implements OnInit {

  navData = navbarData;
  cont:number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}

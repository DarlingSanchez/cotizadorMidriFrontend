import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashRoutingModule } from './dash-routing.module';
import { DashPageComponent } from './page/dash-page/dash-page.component';


@NgModule({
  declarations: [
    DashPageComponent
  ],
  imports: [
    CommonModule,
    DashRoutingModule
  ]
})
export class DashModule { }

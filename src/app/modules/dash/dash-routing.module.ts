import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashPageComponent } from './page/dash-page/dash-page.component';

const routes: Routes = [
  {
    path:'',
    component:DashPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRoutingModule { }

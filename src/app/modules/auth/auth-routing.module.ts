import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from '@core/guards/session.guard';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { RegisterComponent } from './pages/register/register/register.component';

const routes: Routes = [
  {
    path:'',
    component:AuthPageComponent
  },
  {
    path:'registro',
    component:RegisterComponent,
    //canActivate:[SessionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

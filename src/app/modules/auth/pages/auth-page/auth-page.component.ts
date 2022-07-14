import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { GetUserService } from '@core/serviceGetUser/get-user.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});
  errorSession:boolean=false;


  constructor(private form: FormBuilder, private authService:AuthService, private cookie:CookieService, private router:Router) { }

  ngOnInit(): void {
    this.formLogin = this.form.group(
      {
        email: new FormControl('',[
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('',[
          Validators.required
        ])
      }
    )
  }
  sendLogin():void{
    const {email, password} = this.formLogin.value;
    this.authService.sendCredentials(email,password)
      .subscribe(responseOk =>{
       // console.log("Registro correcto", responseOk.id);
        this.cookie.set('token',responseOk.token, 0.5, "/");      
          
        this.router.navigate(['/']);
      }, err=>{
        this.errorSession = true;
        //console.log("Datos incorrectos");
      })
    //console.log(email, password )
  }

  ocultarMsg():void{
    this.errorSession = false;
  }
} 

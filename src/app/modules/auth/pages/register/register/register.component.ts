import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { MessageComponent } from '@modules/clientes/message/message/message.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegitro: FormGroup = new FormGroup({});
  errorSession:boolean=false;
  
  constructor(private form: FormBuilder,private authService:AuthService,private router:Router, private message:MatSnackBar) { }

  ngOnInit(): void {
    this.formRegitro = this.form.group(
      {
        name: new FormControl('',[
          Validators.required          
        ]),
        email: new FormControl('',[
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('',[
          Validators.required,
          Validators.minLength(4)
        ]),
        password_confirmation: new FormControl('',[
          Validators.required,
          Validators.minLength(4)
        ])
      }
    )
  }
  sendRegister():void{
    //const {email, password} = this.formRegitro.value;
    this.authService.sendRegistro(this.formRegitro.value)
      .subscribe(responseOk =>{
        //console.log("Registro correcto", responseOk);
       this.openSnackBar("Se ha registrado exitosamente");

       setTimeout(()=>{
        this.router.navigate(['/login']);
       },300)        
      }, err=>{
        this.errorSession = true;
        console.log("Datos incorrectos");
      })
    //console.log(email, password )
  }
  openSnackBar(mensaje:string) {
    this.message.openFromComponent(MessageComponent, { //MENSAJE DE CONFIRMACION QUE SE AGREGO UN NUEVO CLIENTE
      duration: 3 * 1000,
      data: {mensaje:mensaje}
    });
  }
}

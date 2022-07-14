import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ClientesService } from '@modules/clientes/services/clientes.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-edit-cliente',
  templateUrl: './dialog-edit-cliente.component.html',
  styleUrls: ['./dialog-edit-cliente.component.css']
})
export class DialogEditClienteComponent implements OnInit {

  imagenPrevia: any;
  files: any = [];
  imageName!:File;
  private URL = environment.api;
  fileData!:File;

  formClientes: FormGroup = new FormGroup({});
  //dataEditCliente:any = {}
  constructor(@Inject(MAT_DIALOG_DATA) public dataEditCliente:any, private form:FormBuilder,private sanitizer: DomSanitizer, private clientesService:ClientesService) {
   
  }

  ngOnInit(): void {
    this.imagenPrevia = this.dataEditCliente.logo;
    console.log(`${this.URL}${this.dataEditCliente.logo}`)
    this.formClientes = this.form.group(
      {
          empresa:new FormControl(this.dataEditCliente.nombreEmpresa,[
            Validators.required
          ]),
          direccion:new FormControl(this.dataEditCliente.ubicacion,[
            Validators.required
          ]),
          representante:new FormControl(this.dataEditCliente.representante,[
            Validators.required
          ]),
          correo:new FormControl(this.dataEditCliente.correo,[
            Validators.required,
            Validators.email
          ]),
          telefono:new FormControl(this.dataEditCliente.telefono,[
            Validators.required
          ]),
          ejecutivo:new FormControl(this.dataEditCliente.ejecutivo,[
            Validators.required
          ]),
          correoEjecutivo:new FormControl(this.dataEditCliente.correoEjecutivo,[
            Validators.required,
            Validators.email
          ]),
          categoria:new FormControl(this.dataEditCliente.categoria,[
            Validators.required
          ]),
          logo:new FormControl('',[
                       
          ])
      }
    )
  }

  public onFileSelected(event: any) {
    
   let totalFiles = event.target.files.length;

   //console.log(totalFiles);
    
   if(totalFiles>0){
    const imagen =  <File>event.target.files[0];
    console.log(imagen);
    let imageType = imagen.type;
    this.imageName = imagen
    this.clientesService.cargarImagen(imagen);
    console.log(this.clientesService.getImagen())
    if (imageType.match(/image\/*/)!=null) {
      console.log('Si es una imagen');
      this.files.push(imagen)
      this.blobFile(imagen).then((res: any) => {
        this.imagenPrevia = res.base;
      })

    } else {
      console.log('No es imagen');
    }
   }else{
    this.imagenPrevia = false;
   }
  }
 

  blobFile = async ($event: any) => new Promise((resolve, reject) => {
    //try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    // } catch (e) {
    //   return null;
    // }
  })


}

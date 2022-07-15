import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-dialog-clientes',
  templateUrl: './dialog-clientes.component.html',
  styleUrls: ['./dialog-clientes.component.css']
})
export class DialogClientesComponent implements OnInit {

  imagenPrevia: any;
  files: any = [];
  imageName!:Object;

  fileData!:File;

  formClientes: FormGroup = new FormGroup({});

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private form:FormBuilder,private sanitizer: DomSanitizer, private clientesService:ClientesService) {}

  ngOnInit(): void {
    this.formClientes = this.form.group(
      {
          empresa:new FormControl('',[
            Validators.required
          ]),
          direccion:new FormControl('',[
            Validators.required
          ]),
          representante:new FormControl('',[
            Validators.required
          ]),
          correo:new FormControl('',[
            Validators.required,
            Validators.email
          ]),
          telefono:new FormControl('',[
            Validators.required
          ]),
          ejecutivo:new FormControl('',[
            Validators.required
          ]),
          correoEjecutivo:new FormControl('',[
            Validators.required,
            Validators.email
          ]),
          categoria:new FormControl('',[
            Validators.required
          ]),
          logo:new FormControl('',[
            Validators.required            
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

    // this.fileData = <File>event.target.files[0];
    // this.preview();
  }
  // preview(){
  //   let fileType = this.fileData.type;
  //   if(fileType.match(/image\/*/)==null){
  //     return;
  //   }

  //   let reader = new FileReader();
  //   reader.readAsDataURL(this.fileData);
  //   reader.onload = (_event) =>{
  //     this.imagenPrevia = reader.result;
  //   }
  // }

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

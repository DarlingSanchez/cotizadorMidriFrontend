import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-preview',
  templateUrl: './dialog-preview.component.html',
  styleUrls: ['./dialog-preview.component.css']
})
export class DialogPreviewComponent implements OnInit {
  nombre:string = "";
  descripcion:string= "";
  preview:string= "";

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {
    this.nombre = this.data.nombre;
    this.descripcion = this.data.descripcion;
    this.preview = this.data.preview;
   }

  ngOnInit(): void {
      
  }

}

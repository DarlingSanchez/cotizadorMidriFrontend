import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';

import { ClientesModels } from '@core/models/clientes.model';
import { FondosModels } from '@core/models/fondos.model';
import { MarcasOpsaModels } from '@core/models/marcasOpsa.model';
import { ObjetivosModels } from '@core/models/objetivos.model';
import { dataClientes } from 'src/app/data/clientes';
import { dataFondos } from 'src/app/data/fondos';
import { dataMarcasOpsa } from 'src/app/data/marcasOpsa';
import { dataObjetivos } from 'src/app/data/objetivos';

import pptxgen from "pptxgenjs";


@Component({
  selector: 'app-crear-cotizacion-page',
  templateUrl: './crear-cotizacion-page.component.html',
  styleUrls: ['./crear-cotizacion-page.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class CrearCotizacionPageComponent implements OnInit{

  //SELECT DE CLIENTES
  clientes:ClientesModels[]=[]

  // PLANTILLA DE FONDOS
  plantilla:FondosModels[]=[]

  //PLANTILLA DE MARCAS
  marcas:MarcasOpsaModels[]=[]
  general = true;
  honduras = true;

  panelOpenState = false;

  //DATOS OBJETIVOS
  objetivos:ObjetivosModels[]=[]

      //CREAR PPTX
  // 1. Create a new Presentation
  pres = new pptxgen();


  slide:any;
  constructor() { 
    
  }

  ngOnInit(): void {
    this.clientes = dataClientes;
    this.plantilla = dataFondos;
    this.marcas = dataMarcasOpsa;
    this.objetivos= dataObjetivos;
  }

  crearPptx():void{
    console.log('HOLAAAAAAAAAA');


    // 2. Add a Slide
    this.slide = this.pres.addSlide();
    

    this.slide.background = { path: "../../../../../assets/fondos/template_1.jpg" };
   
    // 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
    let textboxText = "Cotización Midri";
    let textboxOpts = { x: .5, y: .5, color: "000000" };
    this.slide.addText(textboxText, textboxOpts);
    this.slide.addImage({ path: "../../../../../assets/img/logo.png", x: 2, y: 2 });
    
    this.pres.writeFile({ fileName: 'Browser-PowerPoint-Demo.pptx',  });
  }
}

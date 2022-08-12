import { Component, OnInit } from '@angular/core';
import pptxgen from "pptxgenjs";

@Component({
  selector: 'app-ver-cotizaciones-page',
  templateUrl: './ver-cotizaciones-page.component.html',
  styleUrls: ['./ver-cotizaciones-page.component.css']
})
export class VerCotizacionesPageComponent implements OnInit {

  cotizaciones:Array<any>= []
  constructor() { }

  ngOnInit(): void {
  }

  pres:any
  slide:any;
  crearPptx():void{
    
    this.pres = new pptxgen();
    
    this.pres.defineLayout({ name:'A3', width:13, height:7.5 });
    this.pres.layout = 'A3';


     //CREO EL SLIDER PRINCIPAL
     this.slide = this.pres.addSlide();

     //AGREGO FONDO NEGRO CON LOGO MIDRI Y OPSA BLANCOS
     this.slide.background = { path: "../../../../../assets/fondos/fondoNegro.png" };
     
     
    
 
     this.slide.addText("SOLUCION DE MARKETING DIGITAL", { x: 0, y: 3.5, w: 13, h:1, color: "ffffff", fontSize: 36, fontFace:"Barlow SemiBold", align: "center" });
 
     this.slide.addText("ENCONTRANDO SU CLIENTE TARGET", { x: 0, y: 4, w: 13, h:1, color: "ffffff", fontSize: 20, fontFace:"Barlow SemiBold", align: "center" });
 
      //AGREGO LOGO MIDRI
      this.slide.addImage({ path: "../../../../../assets/imgSliderPrincipal/logoMidri.png", x:6, y: 5, w:1.2, h:1 });

      this.slide.addImage({ path: "../../../../../assets/imgSliderPrincipal/logoMidri.png", x:6, y: 6.2, w:1.2, h:1 });
 
   


  
    this.pres.write("base64")
    .then((data:any) => {
        console.log("write as base64: Here are 0-100 chars of `data`:\n");
        console.log(data);
        let dataArray = data.split('+');
        console.log(dataArray);
    })
    .catch((err:Error) => {
        console.error(err);
    });
  }

  applyFilter(event:any){}
}

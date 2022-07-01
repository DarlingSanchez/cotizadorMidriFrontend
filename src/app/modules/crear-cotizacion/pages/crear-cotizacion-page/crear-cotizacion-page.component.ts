import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import { ClientesModels } from '@core/models/clientes.model';
import { FondosModels } from '@core/models/fondos.model';
import { MarcasOpsaModels } from '@core/models/marcasOpsa.model';
import { ObjetivosModels } from '@core/models/objetivos.model';
import { dataClientes } from 'src/app/data/clientes';
import { dataFondos } from 'src/app/data/fondos';
import { dataMarcasOpsa } from 'src/app/data/marcasOpsa';
import { dataObjetivos } from 'src/app/data/objetivos';

import pptxgen from "pptxgenjs";
import { MatTableDataSource } from '@angular/material/table';
import { ClustersModels } from '../../../../core/models/clusters.model';
import { dataClusters } from 'src/app/data/clusters';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MediaMixModels } from '@core/models/mediaMix.model';
import { dataMediaMix } from 'src/app/data/mediaMix';
import { dataClusters2 } from 'src/app/data/clusters2';



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
export class CrearCotizacionPageComponent implements OnInit,AfterViewInit{

  //DATA MEDIA MIX
  awareness:MediaMixModels[]=[]
interes:MediaMixModels[]=[]
intencion:MediaMixModels[]=[]

activeMediaMixAwareness:boolean = false;
activeMediaMixInteres:boolean = false;
activeMediaMixIntencion:boolean = false;

  //SELECT DE CLIENTES
  clientes:ClientesModels[]=[]

  // PLANTILLA DE FONDOS
  fondos:FondosModels[]=[]
  fondos2!: Array<any>;
  filtrofondos: Array<any> = new Array<any>();

  //PLANTILLA DE MARCAS
  marcas:MarcasOpsaModels[]=[]
  general = true;
  honduras = true;

  panelOpenState = false;

  //ARRAY PARA NGMODEL DE MEDIAMIX
  ngmodelMediaMix:string[]=[];

  //DATOS OBJETIVOS
  objetivos:ObjetivosModels[]=[]

  //CLUESTERS TABLE
  displayedColumnsClusters: string[] = ['check','codigo','tipoCluster','nombre', 'nivel', 'region'];
  
  clusters: MatTableDataSource<any>;
  clusters2!: Array<any>;
  //filtroClusters!: Array<any>;
  filtroClusters: Array<any> = new Array<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //DATOS DE MEDIA MIX PRODUCTOS
  mediamix:MatTableDataSource<any>;
  displayedColumnsMediaMix: string[] = ['nombre','cantidad','cpm','impresiones','tarifa','total'];

  captionButtonVerMarcas:string = "Ver más marcas";
  opsa:any;


  definirFondos(event:any):void{
      console.log(event.value);
      this.fondos2 = dataFondos;
      this.fondos2.forEach(element => {
          if(element.idMarca === event.value){
            this.filtrofondos.push(element);
          }        
      });
      this.fondos = this.filtrofondos;
      this.filtrofondos = [];
  }


  cambioPasos():void{

    this.activeMediaMixAwareness = false;
       this.activeMediaMixInteres = false;
       this.activeMediaMixIntencion = false;
    
    let checkedBoxesCluster = document.querySelectorAll('input[name=checkboxClusters]:checked');

     for (var i = 0; i < checkedBoxesCluster.length; i++) {
       let ide = checkedBoxesCluster[i].id;
       let clase = checkedBoxesCluster[i].className;

       

       if((clase.toLowerCase()).trim() === "checkboxawareness"){
          this.activeMediaMixAwareness = true;
       }else if((clase.toLowerCase()).trim() === "checkboxinteres"){
          this.activeMediaMixInteres= true;
       }else if((clase.toLowerCase()).trim() === "checkboxintencion"){ //checkboxintencion
          this.activeMediaMixIntencion = true;
       }
       console.log(clase.toLowerCase().trim());
       //console.table(ide + ' ' + clase)
     }
 
  }

  verMarcas():void{
    this.opsa = document.getElementById("eua");
    if(this.captionButtonVerMarcas == "Ver más marcas"){
        this.captionButtonVerMarcas = "Ver menos";
    }else{        
        this.captionButtonVerMarcas = "Ver más marcas";
        this.opsa.setAttribute("checked", "true");
    }
    var clase = document.getElementsByClassName("marca");
    for (var i = 0; i<clase.length; i++) {
      //clase[i].classList.remove("marca-no-visible");
      clase[i].classList.toggle("marca-no-visible");
   }
  }
  largo = 0;
  filtrarDatos(event:any){
    this.clusters2 = dataClusters;
       
       this.largo = event.value.length;
    if(this.largo==1){        
        this.clusters2.forEach(element => {
            if(element.tipoCluster===event.value[0]){
              this.filtroClusters.push(element);
            }
        });
        this.clusters = new MatTableDataSource(this.filtroClusters);    

    }else if(this.largo==2){
        this.clusters2.forEach(element => {
            if(element.tipoCluster===event.value[0] || element.tipoCluster===event.value[1]){
              this.filtroClusters.push(element);
            }
        });
        this.clusters = new MatTableDataSource(this.filtroClusters);   
    }else{
        this.clusters = new MatTableDataSource(this.clusters2);
    }
    this.filtroClusters = []; 
    //this.filtrarDatos.pop();
    console.log(event.value.length)
  }

  calcularPrecio(event:any):void{
    let id = event.id;
    let value = event.value;
    // let tarifa = document.getElementById(id.replace('input','span-tarifa'));
    // let total = document.getElementById(id.replace('input','span-total'));
    // let tarifaFloat = tarifa?.innerText;

    let tarifa2:HTMLSpanElement = <HTMLSpanElement>document.getElementById(id.replace('input','span-tarifa'));
    let total2:HTMLSpanElement = <HTMLSpanElement>document.getElementById(id.replace('input','span-total'));

    total2.innerHTML = this.calculoTotal(parseFloat(tarifa2.innerText),value).toString();
   
  }
  calculoTotal(valor1:number, valor2:number):string{
    let resultado = valor1*valor2;
    return resultado.toFixed(2);
  }


 awareness_1_1:number = 0;




  slide:any;
  constructor() { 
    this.ngmodelMediaMix= ["awareness0","awareness1","awareness2","awareness3","awareness4","awareness5"];
  

    this.clusters = new MatTableDataSource(dataClusters);
    this.mediamix = new MatTableDataSource(dataMediaMix);

    this.awareness_1_1 = 0;

    dataMediaMix.forEach(element => {
      if(element.id==1){
        this.awareness.push(element);
      }else if(element.id==2){
        this.interes.push(element);
      }else{
        this.intencion.push(element);
      }
    });
   
  }

  ngOnInit(): void {
    this.clientes = dataClientes;
    this.definirFondos({value:0});
    //this.fondos = dataFondos;
    this.marcas = dataMarcasOpsa;
    this.objetivos= dataObjetivos;
  }
  ngAfterViewInit() {
    this.clusters.paginator = this.paginator;
    this.clusters.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clusters.filter = filterValue.trim().toLowerCase();

    if (this.clusters.paginator) {
      this.clusters.paginator.firstPage();
    }
  }

        //CREAR PPTX
  // 1. Crea nueva presentacion
  pres = new pptxgen();
  crearPptx():void{
  
    // 2. Agrego un slider a la presentación SLIDER PRINCIPAL
    this.obtenerSliderPrincipal();

    //AGREGAR SLIDERS DE OBJETIVO GENERAL
    this.obtenerObjetivos();
    
  }

  obtenerSliderPrincipal():void{
    //CREO EL SLIDER
    this.slide = this.pres.addSlide();
    
    //AGREGO FONDO
    this.slide.background = { path: "../../../../../assets/imgSliderPrincipal/fondo.png" };
   
    //AGREGO IMAGEN MEDIA LUNA
    this.slide.addImage({ path: "../../../../../assets/imgSliderPrincipal/mediaLunaTop.png", x: 1.8, y: 0 });

    //AGREGO LOGO MIDRI
    this.slide.addImage({ path: "../../../../../assets/imgSliderPrincipal/logoMidri.png", x: 4, y: 0.2 });

    //AGREGO LOGO OPSA
    //this.slide.addImage({ path: "../../../../../assets/img/logo.png", x: 2, y: 2 });

    let textboxText = "CLUSTERS MIDRI";
    let textboxOpts = { x: 3.5, y: 2.5, color: "ffffff" , size:22};
    this.slide.addText(textboxText, textboxOpts);
    this.descargarPptx();
  }

  obtenerCliente():string{
    return "Cliente";
  }
  obtenerObjetivos():string{
    return "";
  }
  obtenerBackground():object{

    return {}
  }

  obtenerClusters():object{

    return {};
  }
  obtenerMediaMix():object{

    return {};
  }

  descargarPptx():void{
    this.pres.writeFile({ fileName: 'Browser-PowerPoint-Demo.pptx',  });
  }
}

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
import { CrearCotizacionService } from '../../services/crear-cotizacion.service';



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


  //MENSAJE DE NOTIFICACION PARA EL USUARIO
  messageNotificacion:string = "CREANDO PRESENTACIÓN......";
  mostrarMsg:boolean = false;

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

  //BACKGROUND DE SLIDERS
  background:string = ""

  //PLANTILLA DE MARCAS
  marcas:MarcasOpsaModels[]=[]
  general = true;
  honduras = true;

  panelOpenState = false;

  //ARRAY PARA NGMODEL DE MEDIAMIX
  ngmodelMediaMix:string[]=[];

  //DATOS OBJETIVOS
  objetivos:ObjetivosModels[]=[]
  objetivosGenerales:string = "";

  //CLUESTERS TABLE
  displayedColumnsClusters: string[] = ['check','codigo','tipoCluster','nombre', 'nivel', 'usuarios', 'region'];
  
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

codesClusterSelected:Array<any> = []
  cambioPasos():void{

    this.activeMediaMixAwareness = false;
       this.activeMediaMixInteres = false;
       this.activeMediaMixIntencion = false;
  
    this.codesClusterSelected = []
       
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
       console.table(ide);
       //this.codesClusterSelected.push(ide);
       //this.codesClusterSelected = dataClusters.filter(data => data.codigoCluster== parseInt(ide));
       this.codesClusterSelected.push(dataClusters.find(element => element.codigoCluster == parseInt(ide)));
     }
     console.table(this.codesClusterSelected);
     console.log(this.codesClusterSelected.length)
 
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

  cargarData():void{
    const sheetId = '15lNcp-4TXaiqNHWnOuqBd-rB5TSNciYBCGqkW2Zeptc';
    const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
    const sheetName = 'midri';
    const query = encodeURIComponent('Select *')
    const url = `${base}&sheet=${sheetName}&tq=${query}`

    this.clusters2 = []

    fetch(url)
        .then(res => res.text())
        .then(rep => {
            //Remove additional text and extract only JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            let {table} = jsonData;    
           
          for (let i = 0; i < table.rows.length; i++) {
            let {c} = table.rows[i];
            console.log(c[0].v)          
 
             let obj = {
               codigoCluster:c[2].v,
               tipoCluster: c[0].v,
               nivel:c[1].v,
               nombreCluster:c[3].v,
               region:c[4].v,
               audiencia:{
                   numeroUsuarios:c[5].v,
                   numeroSesiones:c[6].v,
                   paginasVistas:c[7].v,
                   tiempoLectura:c[8].v,
               },
               dispositivo:{
                   movil:c[9].v,
                   desktop:c[10].v,
                   tablet:c[11].v,
               },
               genero:{
                   hombre:c[13].v,
                   mujer:c[12].v,
               },
               edades:{
                   de18_a24:c[14].v,
                   de25_a34:c[15].v,
                   de35_a44:c[16].v,
                   de45_a54:c[17].v,
                   de55_a64:c[18].v,
                   mas65:c[19].v,
               },
               educacion:{
                   primaria:c[20].v,
                   secundaria:c[21].v,
                   universidad:c[22].v,
                   educacionTecnica:c[23].v,
                   postGrado: c[24].v,
               },
               padres:{
                   conHijos:c[25].v,
                   sinHijos:c[26].v,
               },
               actividad:{
                   hora:c[27].v,
                   dia:c[28].v
               }
             }
             this.clusters2.push(obj)
          }
    
            console.log(dataClusters.length)
        })
        //return this.clusters2;
        //this.clusters = new MatTableDataSource(this.clusters2);
  }
 
  slide:any;
  constructor() { 
    this.ngmodelMediaMix= ["awareness0","awareness1","awareness2","awareness3","awareness4","awareness5"];
  
    this.clusters = new MatTableDataSource(dataClusters);
    //this.clusters = new MatTableDataSource(this.cargarData());
    
    this.mediamix = new MatTableDataSource(dataMediaMix);

    dataMediaMix.forEach(element => {
      if(element.id==1){
        this.awareness.push(element);
      }else if(element.id==2){
        this.interes.push(element);
      }else{
        this.intencion.push(element);
      }
    });
    
    //OBJETIVO POR DEFAULT
    this.objetivosGenerales = dataObjetivos.find(element => element.id == 1)?.nombreObjetivo || "No hay Objetivos";

    //BACKGROUND POR DEFAULT
    this.background = "../../../../../assets/fondos/fondo.png";
   
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
  pres:any
  
  crearPptx():void{
    this.pres = new pptxgen();
    this.mostrarMsg = true;
    this.pres.defineLayout({ name:'A3', width:13, height:7.5 });
    this.pres.layout = 'A3';
  
    // 2. Agrego un slider a la presentación SLIDER PRINCIPAL
    this.obtenerSliderPrincipal();

    //AGREGAR SLIDERS DE OBJETIVO GENERAL
    //this.obtenerObjetivos();
    
  }

  obtenerSliderPrincipal():void{ //SLIDER PRINCIPAL 

    this.messageNotificacion = "CREANDO SLIDER PRINCIPAL........";
    //CREO EL SLIDER PRINCIPAL
    this.slide = this.pres.addSlide();
    
    //AGREGO FONDO
    this.slide.background = { path: this.background };
   
    //AGREGO IMAGEN MEDIA LUNA
    this.slide.addImage({ path: "../../../../../assets/imgSliderPrincipal/mediaLunaTop.png", x: 2.5, y: 0, w:8, h:2.3 });

    //AGREGO LOGO MIDRI
    this.slide.addImage({ path: "../../../../../assets/imgSliderPrincipal/logoMidri.png", x: 4.5, y: 0.2, w:1.5, h:1.2 });

    //AGREGO LOGO OPSA
    this.slide.addImage({ path: "../../../../../assets/imgSliderPrincipal/logoOpsa.png", x: 6.8, y: 0.5, w:2.4, h:0.6});

    this.slide.addShape(this.pres.ShapeType.line, {x:6, y:0.45, w:1,rotate:45, line: { color: "7044BA", width:4 } });

  
    this.slide.addText("CLUSTERS MIDRI", { x: 1.5, y: 3.7, w: 10, h:1, color: "ffffff", fontSize: 54, fontFace:"Barlow SemiBold", align: "center" });

    this.slide.addText("OVERVIEW ULTIMOS 30 DIAS", { x: 1.5, y: 4.5, w: 10, h:1, color: "ffffff", fontSize: 28, fontFace:"Barlow SemiBold", align: "center" });

   

    this.crearSliderObjetivos();
  }
  
  //SLIDER OBJETIVOS GENERALES
  crearSliderObjetivos():void{
    this.messageNotificacion = "CREANDO SLIDER DE OBJETIVOS GENERALES........";
    if(this.objetivosGenerales ==="custom-objetivo"){
      let custom:HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById('text-custom-objetivo');
      this.objetivosGenerales = custom.value;
    }
     //CREO EL SLIDER DE OBJETIVOS
     this.slide = this.pres.addSlide();

     //AGREGO FONDO
     this.slide.background = { path: this.background };

     //AGREGO LOGO DE OBJETIVOS
     this.slide.addImage({ path: "../../../../../assets/img/objetivos.png", x: 1.5, y: 2, w:3, h:3 });

     this.slide.addText("OBJETIVOS GENERALES", { x: 5, y: 2.5, w: 7, h:1, color: "ffffff", fontSize: 36, fontFace:"Barlow SemiBold"});

     this.slide.addText(this.objetivosGenerales, { x: 5, y: 3, w: 6, h:3, color: "ffffff", fontSize: 16, fontFace:"Barlow SemiBold"});

    this.obtenerClusters();
  }

  obtenerCliente():string{
    return "Cliente";
  }
 
  obtenerObjetivos(event:any):void{
    let {value} = event;
    if(value<4){
      this.objetivosGenerales =  dataObjetivos.find(element => element.id == value)?.nombreObjetivo || " ";
    }else{      
      this.objetivosGenerales = "custom-objetivo";    
    }
    
  }
  obtenerBackground(event:any):void{
    let {value, source} = event
      console.log(source.id);
      console.log(document.getElementById(source.id)?.getElementsByClassName('img-fondo')[0].getAttribute('src'))
      //console.table(event)
      this.background = document.getElementById(source.id)?.getElementsByClassName('img-fondo')[0].getAttribute('src') || "../../../../../assets/fondos/fondo.png"
  }

  covertirPorcentaje(valor:number):number{
      return Math.round(valor * 100);
  }

  obtenerClusters():void{
    this.messageNotificacion = "CREANDO SLIDERS DE CLUSTERS SELECCIONADOS........";
     this.codesClusterSelected.forEach(element => {
           //CREO EL SLIDER
        this.slide = this.pres.addSlide();
      
        //AGREGO FONDO
        this.slide.background = { color:"000000" };
      
        //AGREGO IMAGEN MEDIA LUNA
        this.slide.addImage({ path: "../../../../../assets/sliderCluster/rectanguloClusterBottom.png", x: 0, y: 5.2, w:13, h:2.3 });
      
        //AGREGO LOGO MIDRI
        this.slide.addImage({ path: "../../../../../assets/sliderCluster/logoMidriBlanco.png", x: 10.5, y: 0.2, w:0.6, h:0.5 });

        //AGREGO TITULO Y SUBTITULO
        this.slide.addText(`${element.nombreCluster} | ${element.nivel} | ${element.tipoCluster} | ${element.codigoCluster}`, { x: 0.3, y: 0.3, w: 10, h:0.5, color: "ffffff", fontSize: 24, fontFace:"Calibri" });      
        this.slide.addText(`${element.region} | ULTIMOS 30 DIAS`, { x: 0.3, y: 0.8, w: 8, h:0.5, color: "ffffff", fontSize: 16, fontFace:"Calibri" });
      

        //AGREGO LOGO Y TEXTO DE AUDIENCIAS
        this.slide.addImage({ path: "../../../../../assets/sliderCluster/iconoAudiencia.png", x: 0.3, y: 1.5, w:0.6, h:0.6 });
        this.slide.addText(`INSIGHTS DE LA AUDIENCIA`, { x: 1, y: 1.5, w: 4, h:0.6, color: "ffffff", fontSize: 24, fontFace:"Calibri" });
      
        //AGREGO LOGO Y TEXTO DE USUARIOS
        this.slide.addImage({ path: "../../../../../assets/sliderCluster/iconoUsuarios.png", x: 0.5, y: 2.4, w:0.5, h:0.5 });
        this.slide.addText(`${Intl.NumberFormat().format(element.audiencia.numeroUsuarios)} USUARIOS / MES`, { x: 1, y: 2.4, w: 4, h:0.5, color: "ffffff", fontSize: 16, fontFace:"Calibri" });
        
         //AGREGO LOGO Y TEXTO DE VISTAS
         this.slide.addImage({ path: "../../../../../assets/sliderCluster/iconoVistas.png", x: 0.5, y: 3.1, w:0.5, h:0.4 });
         this.slide.addText(`${Intl.NumberFormat().format(element.audiencia.numeroSesiones)} PAGINAS VISTAS`, { x: 1, y: 3, w: 4, h:0.5, color: "ffffff", fontSize: 16, fontFace:"Calibri" });
         
         //AGREGO LOGO Y TEXTO DE MINUTOS POR SESION
         this.slide.addImage({ path: "../../../../../assets/sliderCluster/iconoHorarios.png", x: 0.5, y: 3.6, w:0.5, h:0.5 });
         this.slide.addText(`${element.audiencia.tiempoLectura} MINUTOS POR SESION`, { x: 1, y: 3.6, w: 4, h:0.5, color: "ffffff", fontSize: 16, fontFace:"Calibri" });
         
         //AGREGO LOGO Y TEXTO DE DISPOSITIVOS
         //mobile
         this.slide.addImage({ path: "../../../../../assets/sliderCluster/iconoMobile.png", x: 0.7, y: 4.5, w:0.3, h:0.5 });
         this.slide.addText(this.covertirPorcentaje(element.dispositivo.movil)+" %", { x: 1.1, y: 4.5, w: 1, h:0.5, color: "ffffff", fontSize: 16, fontFace:"Calibri" });
         
          //desktop
          this.slide.addImage({ path: "../../../../../assets/sliderCluster/iconoDesktop.png", x: 2, y: 4.5, w:0.5, h:0.5 });
          this.slide.addText(this.covertirPorcentaje(element.dispositivo.desktop) +" %", { x: 2.5, y: 4.5, w: 1.5, h:0.5, color: "ffffff", fontSize: 16, fontFace:"Calibri" });
          
           //tablet
         this.slide.addImage({ path: "../../../../../assets/sliderCluster/iconoTablet.png", x: 3.3, y: 4.5, w:0.4, h:0.5 });
         this.slide.addText(this.covertirPorcentaje(element.dispositivo.tablet) + ` %`, { x: 3.7, y: 4.5, w: 1, h:0.5, color: "ffffff", fontSize: 16, fontFace:"Calibri" });
         
         //TITULOS DEL BOTTOM SLIDER         
         this.slide.addText(`COMPORTAMIENTO POR SEMANA`, { x: 0.5, y: 5.5, w: 5, h:0.5, color: "000000", fontSize: 20, fontFace:"Calibri" });
         //datos
         this.slide.addImage({ path: "../../../../../assets/sliderCluster/iconoHora.png", x: 0.5, y: 6.1, w:0.5, h:0.4 });
         this.slide.addText(`HORA MAYOR ENGAGMENT A LAS ${element.actividad.hora}`, { x: 1, y: 6.1, w: 5, h:0.5, color: "000000", fontSize: 16, fontFace:"Calibri" });
         this.slide.addImage({ path: "../../../../../assets/sliderCluster/iconoDia.png", x: 0.5, y: 6.6, w:0.5, h:0.5 });
         this.slide.addText(`DIA DE MAYOR ENGAGMENT EL ${element.actividad.dia}`, { x: 1, y: 6.6, w: 5, h:0.5, color: "000000", fontSize: 16, fontFace:"Calibri" });
         
         this.slide.addText(`DEMOGRAFÍA`, { x: 6, y: 5.5, w: 4, h:0.5, color: "000000", fontSize: 20, fontFace:"Calibri" });
         //datos
         this.slide.addImage({ path: "../../../../../assets/sliderCluster/iconoHombre.png", x: 6, y: 6.1, w:0.5, h:1 });
         this.slide.addText(this.covertirPorcentaje(element.genero.hombre) + " %", { x: 6.5, y: 6.1, w: 1, h:0.5, color: "000000", fontSize: 16, fontFace:"Calibri" });
         this.slide.addImage({ path: "../../../../../assets/sliderCluster/iconoMujer.png", x: 7.5, y: 6.1, w:0.5, h:1 });
         this.slide.addText(this.covertirPorcentaje(element.genero.mujer) + " %", { x: 8, y: 6.1, w: 1, h:0.5, color: "000000", fontSize: 16, fontFace:"Calibri" });
         
         this.slide.addText(`PAREJAS CON HIJOS`, { x: 9.5, y: 5.5, w: 4, h:0.5, color: "000000", fontSize: 20, fontFace:"Calibri" });
          //datos
          this.slide.addImage({ path: "../../../../../assets/sliderCluster/iconoConHijos.png", x: 9.5, y: 6.1, w:0.5, h:0.5 });
          this.slide.addText(`CON HIJOS ${this.covertirPorcentaje(element.padres.conHijos)}%`, { x: 10.1, y: 6.1, w: 2, h:0.5, color: "000000", fontSize: 16, fontFace:"Calibri" });
          this.slide.addImage({ path: "../../../../../assets/sliderCluster/iconoSinHijos.png", x: 9.5, y: 6.8, w:0.5, h:0.5 });
          this.slide.addText(`SIN HIJOS ${this.covertirPorcentaje(element.padres.sinHijos)}%`, { x: 10.1, y: 6.8, w: 2, h:0.5, color: "000000", fontSize: 16, fontFace:"Calibri" });
          

          //TITULO GRAFICO DE EDADES
          this.slide.addImage({ path: "../../../../../assets/sliderCluster/iconoEdades.png", x: 6, y: 1.5, w:0.5, h:0.6 });
        this.slide.addText(`EDADES`, { x: 6.5, y: 1.5, w: 2, h:0.6, color: "ffffff", fontSize: 24, fontFace:"Calibri" });

          //GRAFICO DE EDADES
         
        let edades = [
          {
            name: "Edades",
            labels: ["18 - 24", "25 - 34", "35 - 44", "45 - 54 ", "55 - 64 ", "65+"],
            values: [
              element.edades.de18_a24,
              element.edades.de25_a34,
              element.edades.de35_a44,
              element.edades.de45_a54,
              element.edades.de55_a64,
              element.edades.mas65,
            ],
          },
        ]
        this.slide.addChart(this.pres.ChartType.doughnut, edades, {
          x: 4.9,
          y: 2,
          w: 4.0,
          h: 3.2,
          chartArea: { fill: { color: "FFFFFF" } },
		      holeSize: 70,
		      showLabel: false,
		      showValue: false,
		      showPercent: true,
		      showLegend: true,
		      legendPos: "b",
		      //
		      chartColors: "FFFFFF",
		      //dataBorder: { pt: "2", color: "FFFFFF" },
		      dataLabelColor: "FFFFFF",
		      dataLabelFontSize: 12,
		      //
		      showTitle: false,
		      title: "Project Status",
		      titleColor: "FFFFFF",
		      titleFontFace: "Calibri",
		      titleFontSize: 24,
          legendColor:"FFFFFF"
          
        });

         
         //TITULO GRAFICO DE EDUCACION
         this.slide.addImage({ path: "../../../../../assets/sliderCluster/iconoEducacion.png", x: 9, y: 1.5, w:0.6, h:0.6 });
         this.slide.addText(`EDUCACIÓN`, { x: 9.6, y: 1.5, w: 2, h:0.6, color: "ffffff", fontSize: 24, fontFace:"Calibri" });
 
           //GRAFICO DE EDUCACION
          
         let educacion = [
           {
             name: "Educacion",
             labels: ["Primaria","Secundaria","Universidad","Técnico","Post Grado"],
             values: [
              element.educacion.primaria,
              element.educacion.secundaria,
              element.educacion.universidad,
              element.educacion.educacionTecnica,
              element.educacion.postGrado
             ],
           },
         ]
         this.slide.addChart(this.pres.ChartType.doughnut, educacion, {
           x: 9,
           y: 2,
           w: 4.0,
           h: 3.2,
           chartArea: { fill: { color: "FFFFFF" } },
           holeSize: 70,
           showLabel: false,
           showValue: false,
           showPercent: true,
           showLegend: true,
           legendPos: "b",
           //
           chartColors: "FFFFFF",
           //dataBorder: { pt: "2", color: "FFFFFF" },
           dataLabelColor: "FFFFFF",
           dataLabelFontSize: 12,
           //
           showTitle: false,
           title: "Project Status",
           titleColor: "FFFFFF",
           titleFontFace: "Calibri",
           titleFontSize: 24,
           legendColor:"FFFFFF"
           
         });
      });

    this.obtenerMediaMix()
  }

  obtenerMediaMix():void{
    this.messageNotificacion = "CREANDO SLIDERS DE LOS MEDIA MIX........";
    let inputTotal = document.getElementsByClassName("media-mix-input");


    //DATOS PARA LA TABLA RESUMEN
    let totalInversion = 0;
    let arrTabRows3 = [
      [
        { text: "Producto", options: { fontSize: 20, bold:true }  }, 
        { text: "Entregable", options: { fontSize: 20, bold:true } }, 
        { text: "Inversión", options: { fontSize: 20, bold:true } }
      ]
    ];

    
    for (let index = 0; index < inputTotal.length; index++) {
      const filterValue = (inputTotal[index] as HTMLInputElement).value;
      const filterId = (inputTotal[index] as HTMLInputElement).id;
      
      if(!isNaN(parseFloat(filterValue))){
        //console.log(filterId + " " + filterValue);  
        let id = filterId.replace('-input','');
        let arr = dataMediaMix.find(element => element.idMediaMix == id)
        this.cargarMediaMix(id, parseFloat(filterValue), arr);
        
        totalInversion += parseFloat(filterValue);
        let entregable = this.calcularTarifa(parseFloat(filterValue), arr?.tarifa || 1);
        //LLENAR TABLA RESUMEN
        arrTabRows3.push(
          [
            {text:arr?.nombreMediaMix || "",options: { fontSize: 16, bold:false }},
            {text: Intl.NumberFormat().format(entregable).toString(), options: { fontSize: 16, bold:false }},
            {text: Intl.NumberFormat().format(parseFloat(filterValue)), options: { fontSize: 16, bold:false }}
          ]
        );
      }
      
    }
    arrTabRows3.push(
      [ //SUB TOTAL
        {text:"",options: { fontSize: 16, bold:false }},
        {text: "Sub-Total:", options: { fontSize: 16, bold:false }},
        {text: Intl.NumberFormat().format(totalInversion).toString(), options: { fontSize: 16, bold:false }}
      ],
      [ //IMPUESTO
        {text:"",options: { fontSize: 16, bold:false }},
        {text: "Impuesto:", options: { fontSize: 16, bold:false }},
        {text: Intl.NumberFormat().format((totalInversion * 0.15)).toString(), options: { fontSize: 16, bold:false }}
      ],
      [ //TOTAL TOTAL
        {text:"",options: { fontSize: 20, bold:true }},
        {text: "Total:", options: { fontSize: 20, bold:true }},
        {text: Intl.NumberFormat().format(((totalInversion * 0.15) + totalInversion)).toString(), options: { fontSize: 20, bold:true }}
      ],
    );
    this.tablaResumen(arrTabRows3);
    //console.table(totalMediaMixSelected)
  }
  calcularTarifa(valor:number, tarifa:number):number{
    return valor * tarifa;
  }
  cargarMediaMix(id:string, value:number, arr:any):void{
    console.log(id + " " + value);  
    
    //let arr = dataMediaMix.find(element => element.idMediaMix == id)

    let entregable = this.calcularTarifa(value, arr?.tarifa || 1);

    this.slide = this.pres.addSlide();
    
    //AGREGO FONDO
    this.slide.background = { path: this.background };

    //AGREGO EL TITULO DEL MEDIA MIX
    this.slide.addText(arr?.nombreMediaMix, { x: 1.4, y: 0.4, w: 10, h:1.2, color: "ffffff", fontSize: 36, fontFace:"Calibri" });

     //AGREGO LOGO MEDIA MIX GIF
     this.slide.addImage({ path: "../../../../../assets/sliderCluster/logoMidriBlanco.png", x: 1.5, y: 2, w:2, h:1.8 });

     //AGREGO EL PARRAFO
    this.slide.addText(`Incrementar la consideración de compra por parte del usuario a través estrategias como la generación de tráfico, punto de venta, confirmación de asistencia a un evento, recolección de base de datos, visualización de un catálogo, entre otras.`, { x: 5.1, y: 2, w: 6.5, h:1.5, color: "ffffff", fontSize: 18, fontFace:"Calibri" });

    //AGREGO INVERSION
    this.slide.addText(`Inversión: $${value}`, { x: 5.1, y: 4.1, w: 6.5, h:0.2, color: "ffffff", fontSize: 24, fontFace:"Calibri" });

    //AGREGO ENTREGABLE
    this.slide.addText(`Entregable: ${entregable}`, { x: 5.1, y: 4.5, w: 6.5, h:0.2, color: "ffffff", fontSize: 24, fontFace:"Calibri" });
  }

  tablaResumen(arrTabRows3:any):void{
    this.messageNotificacion = "CREANDO SLIDER TABLA RESUMEN........";
    this.slide = this.pres.addSlide();
    //AGREGO FONDO
    this.slide.background = { path: this.background };

    //AGREGO TITULO
    this.slide.addText(`RESUMEN INVERSION`, { x: 1.5, y: 0.3, w:9, h:0.5, color: "ffffff", fontSize: 36, fontFace:"Barlow SemiBold" });
    
   
    this.slide.addTable(arrTabRows3, {
      x: 1.5,
      y: 1.3,
      rowH: [0.5],
      colW: [6, 2, 2],
      fill: { color: "F7F7F7" },
      color: "000000",
      fontSize: 14,
      valign: "center",      
      border: { pt: "1", color: "BBCCDD" },
    });

    this.descargarPptx();
  }

  descargarPptx():void{
    this.messageNotificacion = "DESCARGANDO PRESENTACIÓN...";
    this.pres.writeFile({ fileName: 'PROPUESTA MIDRI.pptx',  });
    this.mostrarMsg = false;
  }
}

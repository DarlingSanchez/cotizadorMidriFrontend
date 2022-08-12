import { StepperOrientation, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AfterViewInit, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';

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
import { ClientesService } from '@modules/clientes/services/clientes.service';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { NgLocaleLocalization } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { CheckSessionService } from '@core/checkSession/check-session.service';
import { ObjetivosService } from '@modules/crear-cotizacion/services/objetivos.service';



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

  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.clusters.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if(this.isAllSelected()){
      this.selection.clear();
      this.totalMediaMixAwareness=0;
      this.totalMediaMixIntencion=0;
      this.totalMediaMixInteres=0;
    }else{
      this.clusters.data.forEach(row => this.selection.select(row));
      this.totalMediaMixAwareness=1;
      this.totalMediaMixIntencion=1;
      this.totalMediaMixInteres=1;
    }
    // this.isAllSelected() ?
    //     this.selection.clear() :
    //     this.clusters.data.forEach(row => this.selection.select(row));
  }
  progressBar:number = 0

  setProgressBar(value:number):void{
    this.progressBar = value;
  }

  getProgressBar():number{
    return this.progressBar;
  }
  //orientacion!:string;
  orientation!: StepperOrientation
  clienteSeleccionado:string = "";
  private URL = environment.rutaImg;

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

  setObjetivosGenerales(objetivo:string):void{
      this.objetivosGenerales = objetivo;
  }
  getObjetivosGenerales():string{
    return this.objetivosGenerales;
  }

  //CLUESTERS TABLE
  displayedColumnsClusters: string[] = ['select','codigo','tipoCluster','nombre', 'nivel', 'usuarios', 'region'];
  
  clusters!: MatTableDataSource<any>;
  clusters2!: Array<any>;
  //filtroClusters!: Array<any>;
  filtroClusters: Array<any> = new Array<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //DATOS DE MEDIA MIX PRODUCTOS
  mediamix:MatTableDataSource<any>;
  displayedColumnsMediaMix: string[] = ['nombre','cantidad','impresiones','tarifa','total'];

  captionButtonVerMarcas:string = "Ver más marcas";
  opsa:any;


  definirFondos(event:any):void{
      //console.log(event.value);
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

totalMediaMixAwareness:number = 0;
totalMediaMixInteres:number = 0;
totalMediaMixIntencion:number = 0;

selectedCheckBox(event:any):void{
    

    let idYregion = event.source.id.split('-');
    //console.log(idYregion[0], idYregion[1], event.source.id);
    const indexOfObject = (id:number) => this.codesClusterSelected.findIndex(object => {
      return object.codigoCluster === id;
    });

    if(event.checked){
      if((event.source.name.toLowerCase()).trim() === "checkboxawareness"){
        this.totalMediaMixAwareness++;
      }else if((event.source.name.toLowerCase()).trim() === "checkboxinteres"){
        this.totalMediaMixInteres++;
      }else if((event.source.name.toLowerCase()).trim() === "checkboxintencion"){ //checkboxintencion
        this.totalMediaMixIntencion++;
      }
      this.codesClusterSelected.push(dataClusters.find(element => (element.codigoCluster == parseInt(idYregion[0]) && element.region==idYregion[1])));
      //console.table(this.codesClusterSelected)
    }else{
      if((event.source.name.toLowerCase()).trim() === "checkboxawareness"){
        this.totalMediaMixAwareness--;
      }else if((event.source.name.toLowerCase()).trim() === "checkboxinteres"){
        this.totalMediaMixInteres--;
      }else if((event.source.name.toLowerCase()).trim() === "checkboxintencion"){ //checkboxintencion
        this.totalMediaMixIntencion--;
      }
      this.codesClusterSelected.splice(indexOfObject(parseInt(event.source.id)), 1);
    }

    
}
  cambioPasos():void{

    if(!this.checkSesion.checkCookieSession()){
      this.router.navigate(['/','login']);
    }

     this.activeMediaMixAwareness = false;
     this.activeMediaMixInteres = false;
     this.activeMediaMixIntencion = false;
  
    // this.codesClusterSelected = []
       
    // let checkedBoxesCluster = document.querySelectorAll('.mat-checkbox input:checked');
    // //let checkedBoxesCluster = document.querySelectorAll('input[name=checkboxClusters]:checked');
  
    //  for (var i = 0; i < checkedBoxesCluster.length; i++) {
      
    //    let ide = checkedBoxesCluster[i].id;
    //    let ideClean = ide.split('-').shift();
    //    let className = document.getElementById(ideClean || " ");
    //    //let clase = checkedBoxesCluster[i].className; opcion vieja con input checkbox puro
    //    let clase  = className?.className.split(' ')[2] || "";

       

    //    console.log(ideClean, clase);

    //   //  if((clase.toLowerCase()).trim() === "checkboxawareness"){
    //   //     this.activeMediaMixAwareness = true;
    //   //  }else if((clase.toLowerCase()).trim() === "checkboxinteres"){
    //   //     this.activeMediaMixInteres= true;
    //   //  }else if((clase.toLowerCase()).trim() === "checkboxintencion"){ //checkboxintencion
    //   //     this.activeMediaMixIntencion = true;
    //   //  }
    //    //console.log(clase.toLowerCase().trim());
    //    //console.table(ide);
    //    //this.codesClusterSelected.push(ide);
    //    //this.codesClusterSelected = dataClusters.filter(data => data.codigoCluster== parseInt(ide));
    //    this.codesClusterSelected.push(dataClusters.find(element => element.codigoCluster == parseInt(ide)));
    //  }
    
    //  console.log(this.totalMediaMixAwareness, this.totalMediaMixIntencion, this.totalMediaMixInteres)
     //console.log(this.codesClusterSelected.length)

     if(this.totalMediaMixAwareness>0){
         this.activeMediaMixAwareness = true;
      }
      if(this.totalMediaMixInteres>0){
         this.activeMediaMixInteres= true;
      }
      if(this.totalMediaMixIntencion>0){ //checkboxintencion
         this.activeMediaMixIntencion = true;
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
    //console.log(event.value.length)
  }

  calcularPrecio(event:any):void{
    let id = event.id;
    let value = event.value;
    // let tarifa = document.getElementById(id.replace('input','span-tarifa'));
    // let total = document.getElementById(id.replace('input','span-total'));
    // let tarifaFloat = tarifa?.innerText;

    let tarifa:HTMLSpanElement = <HTMLSpanElement>document.getElementById(id.replace('input','span-tarifa'));
    let total:HTMLSpanElement = <HTMLSpanElement>document.getElementById(id.replace('input','span-total'));
    let impresiones:HTMLSpanElement = <HTMLSpanElement>document.getElementById(id.replace('input','span-impresiones'));

    let total2 = this.calculoTotal(parseFloat(tarifa.innerText),value);
    total.innerHTML = total2;
    impresiones.innerHTML = this.calculoImpresiones(parseFloat(tarifa.innerText),value).toString();

    let spanTotal = document.getElementsByClassName('span-total');
    this.calcularTotalTotal(spanTotal, parseFloat(total2));
   
  }

  calcularTotalTotal(spanTotal:any, valor:number):void{
    //console.log(spanTotal[0].innerHTML);
    let sub_total = 0;
    for (let index = 0; index < spanTotal.length; index++) {
      sub_total +=  parseFloat(spanTotal[index].innerHTML.replace(',',''));
    }
    
    let subTotal:HTMLSpanElement = <HTMLSpanElement>document.getElementById('sub-total-total');

    let selectDescuento:HTMLSelectElement =<HTMLSelectElement>document.getElementById("descuentosOPSA");
    //console.log(selectDescuento.value)

    let descuento:HTMLSpanElement = <HTMLSpanElement>document.getElementById('descuento-total');
    let impuesto:HTMLSpanElement = <HTMLSpanElement>document.getElementById('impuesto-total');

    let totalTotal:HTMLSpanElement = <HTMLSpanElement>document.getElementById('total-total');

    //console.log(this.sumatoriaTotal(sub_total,parseFloat(selectDescuento.value))[0]);
    subTotal.innerHTML = "$  " + Intl.NumberFormat().format(sub_total).toString(); 
    descuento.innerHTML = "$  " + Intl.NumberFormat().format(this.sumatoriaTotal(sub_total,parseFloat(selectDescuento.value))[0]).toString(); 
    impuesto.innerHTML = "$  " + Intl.NumberFormat().format(this.sumatoriaTotal(sub_total,parseFloat(selectDescuento.value))[1]).toString();
    totalTotal.innerHTML = "$  " + Intl.NumberFormat().format(this.sumatoriaTotal(sub_total,parseFloat(selectDescuento.value))[2]).toString();
  }
  sumatoriaTotal(subTotal:number, descuento:number):Array<number>{
    let desc = subTotal * (descuento/100);
    let isv = (subTotal-desc) * 0.15;
    let total = (subTotal - desc) + isv;
    return [desc, isv, total];
  }
  calculoTotal(valor1:number, valor2:number):string{
    let resultado = valor1*valor2;
    return Intl.NumberFormat().format(resultado);
  }
  calculoImpresiones(valor1:number, costoPorImpresion:number):string{
    let resultado = costoPorImpresion*1000;
    return Intl.NumberFormat().format(resultado);
  }

  calculoDescuento():void{ //calculando el descuento al cambiar el select
    let selectDescuento:HTMLSelectElement =<HTMLSelectElement>document.getElementById("descuentosOPSA");
    let descuento:HTMLSpanElement = <HTMLSpanElement>document.getElementById('descuento-total');
    let impuesto:HTMLSpanElement = <HTMLSpanElement>document.getElementById('impuesto-total');

    let totalTotal:HTMLSpanElement = <HTMLSpanElement>document.getElementById('total-total');
    let subTotal:HTMLSpanElement = <HTMLSpanElement>document.getElementById('sub-total-total');

    let subTotalLimpio = subTotal.innerHTML.replace('$ ','');

    descuento.innerHTML = "$  " + Intl.NumberFormat().format(this.sumatoriaTotal(parseFloat(subTotalLimpio.replace(',','')),parseFloat(selectDescuento.value))[0]).toString(); 
    impuesto.innerHTML = "$  " + Intl.NumberFormat().format(this.sumatoriaTotal(parseFloat(subTotalLimpio.replace(',','')),parseFloat(selectDescuento.value))[1]).toString();
    totalTotal.innerHTML = "$  " + Intl.NumberFormat().format(this.sumatoriaTotal(parseFloat(subTotalLimpio.replace(',','')),parseFloat(selectDescuento.value))[2]).toString();

    //console.log(selectDescuento.value, subTotal.innerHTML.replace(',',''))
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
            //console.log(c[0].v)          
 
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
    
            //console.log(dataClusters.length)
        })
        //return this.clusters2;
        //this.clusters = new MatTableDataSource(this.clusters2);
  }
 
  @HostListener('window:resize', ['$event'])
  onResize(event:any){
    if(window.innerWidth>500){
      this.orientation = "horizontal";
    }else{
      this.orientation = "vertical";
    }
  }
  slide:any;
  constructor(private clientesService:ClientesService, private router:Router, private checkSesion:CheckSessionService, private objetivosService:ObjetivosService) { 
    this.progressBar = 0;
    this.ngmodelMediaMix= ["awareness0","awareness1","awareness2","awareness3","awareness4","awareness5"];
  
    if(window.innerWidth>500){
      this.orientation = "horizontal";
    }else{
      this.orientation = "vertical";
    }
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

    this.objetivosService.getObjetivos$()
    .subscribe((data=>{
      this.objetivos= data;  
      //console.log(typeof(dataObjetivos))    
      //OBJETIVO POR DEFAULT
      let objetivos = data.find((element: { id: number; }) => element.id == 1)?.nombreObjetivo || "";
      this.setObjetivosGenerales(objetivos);
      //console.log(this.objetivosGenerales)
    }))
    
    

    //BACKGROUND POR DEFAULT
    let fondo = "../../../../../assets/presentacion/opsa/negro/fondoNegro.png";
    this.setFondoPptx(fondo);
    this.setPathFondo("opsa/negro");
    this.setColorFuente("FFFFFF");
    this.marcas = dataMarcasOpsa;
    
  }

  ngOnInit(): void {
    //this.clusters = new MatTableDataSource(dataClusters);
    this.clientesService.getClientes$()
    .subscribe((data=>{
      this.clientes = data;
      setTimeout(()=>{
        this.setLogoCliente();
      },200)
      
    }))
    
    
    this.definirFondos({value:0});
    //this.fondos = dataFondos;
    
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

  fondoPptx:string =""
  pathFondo:string =""
  colorFuente:string=""

  //GET Y SET DE LA URL COMPLETA DEL FONDO
  setFondoPptx(fondo:string):void{
    this.fondoPptx = fondo;
  }
  getFondoPptx():string{
    return this.fondoPptx;
  }
  //GET Y SET DEL NOMBRE DEL FONDO
  setPathFondo(fondo:string):void{
    this.pathFondo = fondo;
  }
  getPathFondo():string{
    return this.pathFondo;
  }
  //GET Y SET DEL COLOR DE LA FUENTE
  setColorFuente(color:string):void{
    this.colorFuente = color;
  }
  getColorFuente():string{
    return this.colorFuente;
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
  setLogoCliente():void{
    let selectCliente:HTMLSelectElement =<HTMLSelectElement>document.getElementById("listClientes");

    this.clientesService.getCliente$(parseInt(selectCliente.value))
     .subscribe((cliente=>{   //ME SUSCRIBO PARA OBTENER EL CLIENTE DEL ID ENVIADO   
      this.clienteSeleccionado = cliente.logo
     }))
    
   
  }
  getLogocliente():string{
    //console.log(this.URL + this.clienteSeleccionado)
    return this.URL + this.clienteSeleccionado;
  }

  obtenerSliderPrincipal():void{ //SLIDER PRINCIPAL 

    this.messageNotificacion = "CREANDO SLIDER PRINCIPAL........";
    //CREO EL SLIDER PRINCIPAL
    this.slide = this.pres.addSlide();

    //AGREGO FONDO NEGRO CON LOGO MIDRI Y OPSA BLANCOS
    this.slide.background = { path: this.getFondoPptx() };
    
    //AGREGO FONDO
    //this.slide.background = { color:"000000" };
   
    //AGREGO LOGO MIDRI BLANCO
    //this.slide.addImage({ path: "../../../../../assets/imgSliderPrincipal/LogoMIDRIBlanco.png", x: 11.5, y: 0.2, w:1, h:0.8 });

    //AGREGO LOGO OPSA
    //this.slide.addImage({ path: "../../../../../assets/imgSliderPrincipal/Logo-OPSABlanco.png", x: 11.3, y: 6.7, w:1.4, h:0.5});

    let colorFuente = this.getColorFuente();
   

    this.slide.addText("SOLUCION DE MARKETING DIGITAL", { x: 0, y: 3.5, w: 13, h:1, color: colorFuente, fontSize: 36, fontFace:"Barlow SemiBold", align: "center" });

    this.slide.addText("ENCONTRANDO SU CLIENTE TARGET", { x: 0, y: 4, w: 13, h:1, color: colorFuente, fontSize: 20, fontFace:"Barlow SemiBold", align: "center" });

     //AGREGO LOGO MIDRI
     this.slide.addImage({ path: "../../../../../assets/imgSliderPrincipal/logoMidri.png", x:6, y: 5, w:1.2, h:1 });

     let ancho = 3;
     let alto = this.getMedidasLogo();

     let posicionX = 5;

     if(ancho==alto){
        ancho = 2
        alto = 2
        posicionX = 5.5
     }
     //AGREGO LOGO DEL CLIENTE
     //this.slide.addImage({ path: this.getLogocliente(), x: 5, y: 1.2, w:5.0, h:2.5, sizing: { type: "contain", w: 4.72, h: 1.61 } });
     this.slide.addImage({ path: this.getLogocliente(), x: posicionX, y: 1, w: ancho, h: alto });
   

      this.crearPresentacionMidri();
  }

  anchoImg:number = 0
  altoImg:number = 0
  relacionAspecto:number = 0

  getMedidasLogo():number{
    let imagen = document.getElementById("logo-cliente")?.getAttribute('src') || "";

    let img = new Image();

    img.src = imagen;

    this.anchoImg = img.width;
    this.altoImg = img.height;

    this.relacionAspecto = this.anchoImg / this.altoImg;

    let newH = 270 / this.relacionAspecto;

    //console.log(270, newH)
    //console.log(270/90, newH/90)

    return newH/90;
  }

  //SLIDER DE PRESENTACION
  crearPresentacionMidri():void{

    //OBTENGO SLIDER PRINCIPAL PARA SACAR VARIABLES

    
    //CREO EL SLIDER DE PRESENTACION
    this.slide = this.pres.addSlide();
    
    //AGREGO FONDO NEGRO CON LOGO MIDRI Y OPSA BLANCOS
    this.slide.background = { path: `../../../../../assets/presentacion/${this.getPathFondo()}/queesMidri.png` };
   
  
    //AGREGO TITULO
    //this.slide.addText("¿QUE ES MIDRI?", { x: 0.6, y: 0.6, w: 10, h:0.5, color: "ffffff", fontSize: 28, fontFace:"Barlow SemiBold" });

    //AGREGO DESCRIPCION
    //this.slide.addText(`Es una Plataforma de Gestión de Datos que captura, procesa, clasifica, agrupa y almacena información de las audiencias de Grupo OPSA y las devuelve de una manera útil en clusters de audiencias que permite ejecutar campañas publicitarias al target correcto generando un alto rendimiento de las mismas en beneficio de los objetivos de nuestros clientes.`, { x: 0.6, y: 1.2, w: 12, h:1.4, color: "ffffff", fontSize: 18, fontFace:"Calibri"});

    //AGREGO IMAGEN DE DIARIOS
    //this.slide.addImage({ path: "../../../../../assets/presentacion/diarios.png", x: 2, y: 3, w:9, h:3.5 });

    this.crearAgrupaUsuarios();
  }

  crearAgrupaUsuarios():void{
    //CREO EL SLIDER DE PRESENTACION
    this.slide = this.pres.addSlide();
    
    //AGREGO FONDO NEGRO CON LOGO MIDRI Y OPSA BLANCOS
    this.slide.background = { path: `../../../../../assets/presentacion/${this.getPathFondo()}/agrupaUsuarios.png` };

    this.crearFunel();
  }

  crearFunel():void{
    //CREO EL SLIDER DE PRESENTACION
    this.slide = this.pres.addSlide();
    
    //AGREGO FONDO NEGRO CON LOGO MIDRI Y OPSA BLANCOS
    this.slide.background = { path: `../../../../../assets/presentacion/${this.getPathFondo()}/funel.png` };

    this.crearSliderObjetivos();
  }
  
  //SLIDER OBJETIVOS GENERALES
  crearSliderObjetivos():void{
    // this.messageNotificacion = "CREANDO SLIDER DE OBJETIVOS GENERALES........";
      if(this.objetivosGenerales ==="custom-objetivo"){
        let custom:HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById('text-custom-objetivo');
        this.setObjetivosGenerales(custom.value);
      }
     //CREO EL SLIDER DE OBJETIVOS
     this.slide = this.pres.addSlide();

     //AGREGO FONDO
     this.slide.background = { path: this.getFondoPptx() };

     //AGREGO LOGO DE OBJETIVOS
     this.slide.addImage({ path: "../../../../../assets/img/objetivos.png", x: 4.6, y: 2.5, w:3, h:3 });

     let colorFuente = this.getColorFuente();
     //AGREGO TITULO
    this.slide.addText("OBJETIVO DE LA SOLUCION DIGITAL", { x: 0.6, y: 0.6, w: 10, h:0.5, color: colorFuente, fontSize: 28, fontFace:"Barlow SemiBold" });

    //AGREGO DESCRIPCION
    this.slide.addText(this.getObjetivosGenerales(), { x: 0.6, y: 1.2, w: 12, h:1.4, color: colorFuente, fontSize: 18, fontFace:"Calibri"});

    this.crearTitleCluester();
  }

  crearTitleCluester():void{
    //CREO EL SLIDER DE PRESENTACION
    this.slide = this.pres.addSlide();
    
    //AGREGO FONDO NEGRO CON LOGO MIDRI Y OPSA BLANCOS
    this.slide.background = { path: `../../../../../assets/presentacion/${this.getPathFondo()}/clusterImpactar.png` };

    this.obtenerClusters();
  }

  obtenerCliente():string{
    return "Cliente";
  }
 
  obtenerObjetivos(event:any):void{
    let {value} = event;
 
    //console.log(value, typeof(value))
        this.objetivosService.getObjetivo$(value)
        .subscribe((objetivo=>{          
          this.setObjetivosGenerales(objetivo.nombreObjetivo);
        }), error=>{
          this.setObjetivosGenerales("custom-objetivo");  
          //console.log("objetivo", error)
        })

    // if(value<4){
      
        
    //   this.objetivosGenerales =  dataObjetivos.find(element => element.id == value)?.nombreObjetivo || "";
    // }else{      
    //   this.objetivosGenerales = "custom-objetivo";    
    // }
    //console.log(this.getObjetivosGenerales())
   
  }
  obtenerBackground(event:any):void{
    let {value, source} = event
      //console.log(source.id);
      //console.log(document.getElementById(source.id)?.getElementsByClassName('img-fondo')[0].getAttribute('src'))
      //console.table(event)
      let fondo = document.getElementById(source.id)?.getElementsByClassName('img-fondo')[0].getAttribute('src') || "../../../../../assets/presentacion/opsa/negro/fondoNegro.png"
      this.setFondoPptx(fondo);   
      let path = fondo.split('/');

      this.setPathFondo(`${path[4]}/${path[5]}`);
      if(path[5]=="negro"){
        this.setColorFuente("FFFFFF");
      }else if(path[5]=="blanco"){
        this.setColorFuente("000000");
      }
  }

  covertirPorcentaje(valor:number):number{
      return Math.round(valor * 100);
  }

  obtenerClusters():void{
    let totalClusters = 0;
    this.messageNotificacion = "CREANDO SLIDERS DE CLUSTERS SELECCIONADOS........";
     this.codesClusterSelected.forEach(element => {

      totalClusters++;
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
        this.slide.addText(`EDADES`, { x: 6.25, y: 1.5, w: 2, h:0.6, color: "ffffff", fontSize: 24, fontFace:"Calibri" });

        this.slide.addImage({ path: "../../../../../assets/sliderCluster/iconoEdades.png", x: 6.6, y: 3.1, w:0.5, h:0.6 });

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
         this.slide.addImage({ path: "../../../../../assets/sliderCluster/iconoEducacion.png", x: 10.7, y: 3, w:0.6, h:0.6 });
         this.slide.addText(`EDUCACIÓN`, { x: 10, y: 1.5, w: 2, h:0.6, color: "ffffff", fontSize: 24, fontFace:"Calibri" });

        
 
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
//console.log("Total clusters ",totalClusters);
      this.crearTitleMediaMix();
     
  }

  crearTitleMediaMix():void{
    //CREO EL SLIDER DE PRESENTACION
    this.slide = this.pres.addSlide();
    
    //AGREGO FONDO NEGRO CON LOGO MIDRI Y OPSA BLANCOS
    this.slide.background = { path: `../../../../../assets/presentacion/${this.getPathFondo()}/mediaMix.png` };

    this.obtenerMediaMix();
  }

  obtenerMediaMix():void{
    
    this.messageNotificacion = "CREANDO SLIDERS DE LOS MEDIA MIX........";
    let inputTotal = document.getElementsByClassName("media-mix-input");


    //DATOS PARA LA TABLA RESUMEN
    let totalInversion = 0;
    let totalFilas =0;
    let altoFila = 0;
    let tamanoLetra = 12;
    let tablaResumenMediaMix = [
      [
        { text: "Producto", options: { fontSize: 20, bold:true }  }, 
        { text: "CPMs", options: { fontSize: 20, bold:true } }, 
        { text: "Entregable", options: { fontSize: 20, bold:true } }, 
        { text: "Inversión", options: { fontSize: 20, bold:true } }
      ]
    ];
    for (let index = 0; index < inputTotal.length; index++) {
      const valueInput = (inputTotal[index] as HTMLInputElement).value;      
      if(!isNaN(parseFloat(valueInput))){
        totalFilas++;
      }
    }
    
    if(totalFilas<=11){
      tamanoLetra = 13;
      altoFila = 0.33;
    }else if(totalFilas>11 && totalFilas<=14){
      tamanoLetra = 11;
      altoFila = 0.28;
    }else{
      tamanoLetra = 9;
      altoFila = 0.25;
    }
    let totalMediaMix = 0
     for (let index = 0; index < inputTotal.length; index++) {
       const filterValue = (inputTotal[index] as HTMLInputElement).value;
       const filterId = (inputTotal[index] as HTMLInputElement).id;

       let valueInput = parseFloat(filterValue);
    
       if(!isNaN(valueInput) && valueInput>0){
         //console.log(filterId + " " + filterValue);  
         totalFilas++;
         totalMediaMix++;
         let id = filterId.replace('-input','');
         let arr = dataMediaMix.find(element => element.idMediaMix == id)
         this.cargarMediaMix(id, parseFloat(filterValue), arr);
      
         totalInversion += parseFloat(filterValue);
         let tarifa = this.calcularTarifa(parseFloat(filterValue), arr?.tarifa || 1);
         //LLENAR TABLA RESUMEN
         tablaResumenMediaMix.push(
           [
             {text:arr?.nombreMediaMix || "",options: { fontSize: tamanoLetra, bold:false }}, //COLUMNA NOMBRE
             {text: Intl.NumberFormat().format(parseFloat(filterValue)), options: { fontSize: tamanoLetra, bold:false }},   //COLUMNA CPMs
             {text: Intl.NumberFormat().format(parseFloat(filterValue) *1000).toString(), options: { fontSize: tamanoLetra, bold:false }}, //COLUMNA ENTREGABLE
             {text: "$ " + Intl.NumberFormat().format(tarifa).toString(), options: { fontSize: tamanoLetra, bold:false }},  //COLUMNA INVERSION
           ]
         );
       }
    
     }
    //console.log("totalMediaMix",totalMediaMix)
    let subTotal:HTMLSpanElement = <HTMLSpanElement>document.getElementById('sub-total-total');
    let descuento:HTMLSpanElement = <HTMLSpanElement>document.getElementById('descuento-total');
    let selectDescuento:HTMLSelectElement =<HTMLSelectElement>document.getElementById("descuentosOPSA");
    let impuesto:HTMLSpanElement = <HTMLSpanElement>document.getElementById('impuesto-total');
    let total:HTMLSpanElement = <HTMLSpanElement>document.getElementById('total-total');
    
    
    //AGREGO EL SUBTOTAL A LA TABLA RESUMEN
    tablaResumenMediaMix.push(
      [ //SUB TOTAL
        {text:"",options: { fontSize: tamanoLetra, bold:false }},
        {text:"",options: { fontSize: tamanoLetra, bold:false }},
        {text: "Sub-Total:", options: { fontSize: tamanoLetra, bold:false }},
        {text:subTotal.innerHTML, options: { fontSize: tamanoLetra, bold:false }}
      ],
      
    );
    //AGREGO EL DESCUENTO SI EXISTE A LA TABLA RESUMEN

    if(selectDescuento.value!="0"){
      tablaResumenMediaMix.push(
        [ //SUB TOTAL
          {text:"",options: { fontSize: tamanoLetra, bold:false }},
          {text:"",options: { fontSize: tamanoLetra, bold:false }},
          {text: "Descuento:", options: { fontSize: tamanoLetra, bold:false }},
          {text:descuento.innerHTML, options: { fontSize: tamanoLetra, bold:false }}
        ],        
      );
    }

    //AGREGO EL IMPUESTO Y TOTAL A PAGAR A LA TABLA RESUMEN
    tablaResumenMediaMix.push(
      [ //IMPUESTO
        {text:"",options: { fontSize: tamanoLetra, bold:false }},
        {text:"",options: { fontSize: tamanoLetra, bold:false }},
        {text: "Impuesto:", options: { fontSize: tamanoLetra, bold:false }},
        {text: impuesto.innerHTML, options: { fontSize: tamanoLetra, bold:false }}
      ],
      [ //TOTAL TOTAL
        {text:"",options: { fontSize: tamanoLetra, bold:true }},
        {text:"",options: { fontSize: tamanoLetra, bold:false }},
        {text: "Total:", options: { fontSize: 16, bold:true }},
        {text: total.innerHTML, options: { fontSize: 16, bold:true }}
      ],
    )
    
    this.graficoResumen();
    this.tablaResumen(tablaResumenMediaMix, altoFila);
    //console.table(totalMediaMixSelected)

  }
  calcularTarifa(valor:number, tarifa:number):number{
    return valor * tarifa;
  }
  cargarMediaMix(id:string, value:number, arr:any):void{
    //console.log(id + " " + value);  
    
    //let arr = dataMediaMix.find(element => element.idMediaMix == id)

    let tarifa = this.calcularTarifa(value, arr?.tarifa || 1);

    this.slide = this.pres.addSlide();
    
    //AGREGO FONDO
    this.slide.background = { path: this.getFondoPptx() };

    let colorFuente = this.getColorFuente();

    //AGREGO EL TITULO DEL MEDIA MIX
    this.slide.addText(arr?.nombreMediaMix, { x: 1.4, y: 0.4, w: 10, h:1.2, color: colorFuente, fontSize: 36, fontFace:"Calibri" });

     //AGREGO LOGO MEDIA MIX GIF "../../../../../assets/preview/display-normal.gif"
     this.slide.addImage({ path: arr.preview , x: 0.5, y: 1.7, w:3.25, h:4 });

     //AGREGO EL PARRAFO
    this.slide.addText(dataMediaMix.find(element => element.idMediaMix == id)?.descripcion, { x: 4.1, y: 2, w: 6.5, h:1.5, color: colorFuente, fontSize: 18, fontFace:"Calibri" });

    //AGREGO INVERSION
    this.slide.addText(`Inversión en Dólares: $${Intl.NumberFormat().format(tarifa)} `, { x: 4.1, y: 4.1, w: 6.5, h:0.2, color: colorFuente, fontSize: 24, fontFace:"Calibri" });

    //AGREGO ENTREGABLE
    this.slide.addText(`Entregable en Impresiones: ${Intl.NumberFormat().format(value*1000)} ${dataMediaMix.find(element => element.idMediaMix == id)?.entregable}`, { x: 4.1, y: 4.5, w: 7.5, h:0.5, color: colorFuente, fontSize: 24, fontFace:"Calibri" });
    
  }

  labels:Array<any> = [];
    values:Array<any> = [];
  graficoResumen():void{

    this.slide = this.pres.addSlide();
    
    //AGREGO FONDO
    this.slide.background = { path: this.getFondoPptx() };

    let colorFuente = this.getColorFuente();

    //AGREGO EL TITULO DEL MEDIA MIX
    this.slide.addText("CLUSTERS AFINES QUE SE IMPACTARÁN", { x: 1.4, y: 0.4, w: 10, h:1.2, color: colorFuente, fontSize: 36, fontFace:"Calibri" });

    this.slide.addText("Clusters de audiencia a impactar", { x: 0.5, y: 1.5, w: 5, h:0.5, color: colorFuente, fontSize: 24, fontFace:"Calibri" });

    

    let totalUsuarios = 0;

    let position = 2.3;
    
    this.codesClusterSelected.forEach(element => {
        this.labels.push(element.nombreCluster);
        this.values.push(element.audiencia.numeroUsuarios);
        totalUsuarios += element.audiencia.numeroUsuarios;

        this.slide.addText(`${element.nombreCluster.toLowerCase()} (${element.tipoCluster.toLowerCase()}) ${Intl.NumberFormat().format(element.audiencia.numeroUsuarios)} usuarios`, { x: 0.5, y: position, w: 8, h:0.2, color: colorFuente, fontSize: 18, fontFace:"Calibri" });

        position+=0.3;
    });
    

    this.slide.addText(`Total audiencia target a impactar: ${Intl.NumberFormat().format(totalUsuarios)} usuarios`, { x: 0.5, y: 6.4, w: 10, h:0.5, color: colorFuente, fontSize: 24, fontFace:"Calibri" });
       //GRAFICO DE RESUMEN CLUSTERS
          
       let resumenClusters = [
        {
          name: "Resumen",
          labels: this.labels,
          values: this.values,
        },
      ]
      this.slide.addChart(this.pres.ChartType.pie, resumenClusters, {
        x: 7,
        y: 1.5,
        w: 4.5,
        h: 4.5,
        chartArea: { fill: { color: colorFuente } },
        holeSize: 70,
        showLabel: false,
        showValue: false,
        showPercent: true,
        showLegend: true,
        legendPos: "b",
        //
        chartColors: colorFuente,
        //dataBorder: { pt: "2", color: "FFFFFF" },
        dataLabelColor: colorFuente,
        dataLabelFontSize: 12,
        //
        showTitle: false,
        title: "Project Status",
        titleColor: colorFuente,
        titleFontFace: "Calibri",
        titleFontSize: 24,
        legendColor:colorFuente
        
      });
      this.codesClusterSelected = [];
      this.labels = []
      this.values =[]
      totalUsuarios = 0;

      position = 2.3;
  }

  tablaResumen(tablaResumenMediaMix:any , altoFila:number):void{
    this.messageNotificacion = "CREANDO SLIDER TABLA RESUMEN........";
    this.slide = this.pres.addSlide();
    //AGREGO FONDO
    this.slide.background = { path: this.getFondoPptx() };

    let colorFuente =  this.getColorFuente();

    //AGREGO TITULO
    this.slide.addText(`RESUMEN INVERSION`, { x: 0.4, y: 0.2, w:9, h:0.5, color: colorFuente, fontSize: 36, fontFace:"Barlow SemiBold" });
    
   
    this.slide.addTable(tablaResumenMediaMix, {
      x: 0.5,
      y:0.8,
      rowH: [altoFila],
      colW: [6, 1,2, 2],
      // fill: { color: "F7F7F7" },
      color: this.getColorFuente(),
      fontSize: 14,
      valign: "center",   
      border: { pt: "1", color: "BBCCDD" },
    });

    this.descargarPptx();
  }
  
  descargarPptx():void{
    this.messageNotificacion = "GENERANDO PRESENTACIÓN...";
    let fileName = "PROPUESTA MIDRI.pptx";
    this.pres.writeFile({ fileName: 'PROPUESTA MIDRI.pptx'})
        .then(() => {
          //console.log(`created file: ${fileName}`);
          this.messageNotificacion = "DESCARGANDO PRESENTACIÓN...";

          setTimeout(() => {
            this.mostrarMsg = false;
            //this.router.navigate(["/crear-cotizacion"]);
            this.limpiarTodo();
          }, 3000);
          
        })
    
  }
  @ViewChild('stepper',{read:MatStepper}) stepper!:MatStepper;
  limpiarTodo():void{
      this.stepper.reset();
      this.selection.clear();
      this.totalMediaMixAwareness=0;
      this.totalMediaMixIntencion=0;
      this.totalMediaMixInteres=0;

      console.table(this.codesClusterSelected)
  }  

}

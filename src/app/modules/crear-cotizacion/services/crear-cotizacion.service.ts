import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearCotizacionService {

  constructor() { }
data:Array<any> = []
  getAllCluster():Array<any>{
    const sheetId = '15lNcp-4TXaiqNHWnOuqBd-rB5TSNciYBCGqkW2Zeptc';
    const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
    const sheetName = 'midri';
    const query = encodeURIComponent('Select *')
    const url = `${base}&sheet=${sheetName}&tq=${query}`

    

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
             this.data.push(obj)
          }
    
            //console.log(dataClusters.length)
        })
    return [];
  }
}

import { ActividadModels } from "./actividad.model";
import { AudienciaModels } from "./audiencia.model";
import { DispositivoModels } from "./dispositivo.model";

import { EdadesModels } from "./edades.model";
import { EducacionModels } from "./educacion.model";
import { GeneroModels } from "./genero.model";
import { PadresModels } from "./padres.model";

export interface ClustersModels {
    codigoCluster:number;
    tipoCluster:string;
    nivel:string;
    nombreCluster:string;
    region:string;
    audiencia?: AudienciaModels;
    dispositivo?: DispositivoModels;
    genero?:GeneroModels;
    edades?:EdadesModels;
    educacion?:EducacionModels;
    padres?:PadresModels;
    actividad?:ActividadModels
}
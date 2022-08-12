import { ClustersModels } from './clusters.model';
import { MediaMixModels } from './mediaMix.model';


export interface PptxModels {
    id:number;
    id_cliente:number;
    id_plantillas:number;
    objetivos:string;
    clusters: ClustersModels;
    mediaMix:MediaMixModels;
}

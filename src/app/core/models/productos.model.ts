import { CategoriasModels } from "./categorias.model";
import { EtiquetasModels } from "./etiquetas.model";

export interface ProductosModels {
    id:number;
    nombreProducto: string;
    categoria:CategoriasModels,
    etiqueta: EtiquetasModels,
    inversion:number,
    alcance:number,
    modelo:string
}
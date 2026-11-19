export type Categoria = 'carros'|'vans'|'caminhao-onibus';
export type Produto = {sku:string;ativo:boolean;categoria:Categoria;subcategoria:string;marca:string;modelo:string;largura:number;perfil:number|null;aro:number;sufixo:string;indice_carga:string;indice_velocidade:string;aplicacao:string;runflat:boolean;xl:boolean;preco:number|null;preco_de:number|null;oferta:boolean;destaque:boolean;foto_url:string;descricao:string;garantia:string;exemplo?:boolean};
export type Medida = {categoria:Categoria;largura:string;perfil:string;aro:string};

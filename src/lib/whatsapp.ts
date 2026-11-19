import {site} from '../config/site';
import {medidaTexto} from './busca-medida';
import type {Produto} from './types';
export const whatsapp=(texto:string)=>`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`;
export function mensagemProduto(p:Produto,q:number,servicos:string[]=[]){return `${site.whatsappSaudacao}\nTem disponível?\n• ${q}x ${p.marca} ${p.modelo} — ${medidaTexto(p)} ${p.indice_carga}${p.indice_velocidade}\nCódigo: ${p.sku}${servicos.length?'\nServiços: '+servicos.join(', '):''}\nPode me passar o valor e a disponibilidade?`;}
export function mensagemLista(itens:{produto:Produto;quantidade:number}[],servicos:string[],nome:string,veiculo:string){return `${site.whatsappSaudacao}\nQuero consultar:\n${itens.map((i,n)=>`${n+1}. ${i.quantidade}x ${i.produto.marca} ${i.produto.modelo} — ${medidaTexto(i.produto)} ${i.produto.indice_carga}${i.produto.indice_velocidade} (Código: ${i.produto.sku})`).join('\n')}${servicos.length?'\nServiços: '+servicos.join(', '):''}${nome?'\nNome: '+nome:''}${veiculo?'\nVeículo: '+veiculo:''}\nPode me passar o valor e a disponibilidade?`;}

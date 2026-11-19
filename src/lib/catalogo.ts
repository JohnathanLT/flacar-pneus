import Papa from 'papaparse';
import {z} from 'zod';
import exemplo from '../data/produtos-exemplo.json';
import {site} from '../config/site';
import {faixas} from '../data/faixas-medida';
import type {Produto} from './types';
const bool=z.preprocess(v=>v===true||String(v).trim().toLowerCase()==='sim',z.boolean());
const numero=z.preprocess(v=>v===''||v==null?null:typeof v==='number'?v:Number(String(v).replace(/R\$|\s/g,'').replace(/\.(?=\d{3}(?:\D|$))/g,'').replace(',','.')),z.number().nonnegative().nullable());
const texto=z.preprocess(v=>v==null?'':String(v).trim(),z.string());
export const schema=z.object({sku:z.string().min(1),ativo:bool,categoria:z.enum(['carros','vans','caminhao-onibus']),subcategoria:texto,marca:z.string().min(1),modelo:z.string().min(1),largura:z.coerce.number().positive(),perfil:numero,aro:z.coerce.number().positive(),sufixo:texto,indice_carga:texto,indice_velocidade:texto,aplicacao:texto,runflat:bool,xl:bool,preco:numero,preco_de:numero,oferta:bool,destaque:bool,foto_url:texto,descricao:texto,garantia:texto,exemplo:z.boolean().optional()});
export function validar(rows:unknown[]):Produto[]{const seen=new Set<string>();return rows.flatMap((row,i)=>{const r=schema.safeParse(row);if(!r.success){console.warn('Linha inválida do catálogo',i+2,r.error.issues);return [];}const p=r.data;if(!p.ativo||seen.has(p.sku))return [];seen.add(p.sku);if(process.env.NODE_ENV==='development'&&p.categoria==='carros'){const f=faixas.find(f=>f[0]===p.aro);if(f&&(p.largura<f[1]||p.largura>f[2]))console.warn('Medida fora da faixa orientativa',p.sku);}return [p];});}
export const produtosExemplo=validar(exemplo);
let cache:{at:number;produtos:Produto[];fallback:boolean}|null=null;
export async function carregarCatalogo(){if(cache&&Date.now()-cache.at<600000)return cache;if(!site.planilhaId)return cache={at:Date.now(),produtos:produtosExemplo,fallback:true};try{const r=await fetch(`https://docs.google.com/spreadsheets/d/${encodeURIComponent(site.planilhaId)}/gviz/tq?tqx=out:csv&sheet=Produtos`,{signal:AbortSignal.timeout(12000)});if(!r.ok)throw Error('Falha na planilha');const csv=await r.text();if(csv.trim().startsWith('<'))throw Error('Planilha não publicada');const parsed=Papa.parse(csv,{header:true,skipEmptyLines:true,transformHeader:h=>h.trim()});if(parsed.errors.length)console.warn(parsed.errors);const produtos=validar(parsed.data);if(!produtos.length)throw Error('Catálogo sem produtos válidos');return cache={at:Date.now(),produtos,fallback:false};}catch(e){console.warn('Usando catálogo de demonstração',e);return cache={at:Date.now(),produtos:produtosExemplo,fallback:true};}}

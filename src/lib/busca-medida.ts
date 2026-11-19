import type {Produto,Medida,Categoria} from './types';
export const perfilValor=(p:Produto)=>p.perfil===null?'sem-perfil':String(p.perfil);
export function opcoes(produtos:Produto[],categoria:Categoria,etapa:'largura'|'perfil'|'aro',largura='',perfil='') {
 const rows=produtos.filter(p=>p.categoria===categoria && (etapa==='largura'||String(p.largura)===largura) && (etapa!=='aro'||perfilValor(p)===perfil));
 const counts=new Map<string,number>(); for(const p of rows){const v=etapa==='perfil'?perfilValor(p):String(p[etapa]);counts.set(v,(counts.get(v)||0)+1);}
 return [...counts].sort((a,b)=> (a[0]==='sem-perfil'?-1:Number(a[0]))-(b[0]==='sem-perfil'?-1:Number(b[0]))).map(([value,count])=>({value,count,label:value==='sem-perfil'?'Sem perfil':value}));
}
export function mudarMedida(m:Medida,key:keyof Medida,value:string):Medida {return {...m,[key]:value,...(key==='categoria'?{largura:'',perfil:'',aro:''}:key==='largura'?{perfil:'',aro:''}:key==='perfil'?{aro:''}:{})};}
export const medidaTexto=(p:Pick<Produto,'largura'|'perfil'|'aro'|'sufixo'>)=>`${p.largura}${p.perfil===null?'':'/'+p.perfil} R${p.aro}${p.sufixo}`;
export const medidaUrl=(m:Medida)=>'/pneus/?'+new URLSearchParams(m).toString();
export function restaurarMedida(q:URLSearchParams):Medida {return {categoria:['carros','vans','caminhao-onibus'].includes(q.get('categoria')||'')?q.get('categoria') as Categoria:'carros',largura:q.get('largura')||'',perfil:q.get('perfil')||'',aro:q.get('aro')||''};}
export const diametro=(largura:number,perfil:number,aro:number)=>aro*25.4+2*largura*perfil/100;
export function equivalentes(produtos:Produto[],m:Medida){if(!m.largura||!m.perfil||!m.aro||m.perfil==='sem-perfil')return [];const d=diametro(+m.largura,+m.perfil,+m.aro);const vistos=new Set<string>();return produtos.filter(p=>p.categoria===m.categoria&&p.perfil!==null&&Math.abs(p.aro-+m.aro)<=1).map(p=>({produto:p,diferenca:(diametro(p.largura,p.perfil!,p.aro)/d-1)*100})).filter(({produto:p,diferenca})=>{const key=medidaTexto(p);if(vistos.has(key)||Math.abs(diferenca)>3||(p.largura===+m.largura&&p.perfil===+m.perfil&&p.aro===+m.aro))return false;vistos.add(key);return true;}).sort((a,b)=>Math.abs(a.diferenca)-Math.abs(b.diferenca));}

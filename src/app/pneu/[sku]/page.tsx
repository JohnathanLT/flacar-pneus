import {ProductPage} from '@/components/catalogo-app';
import {produtosExemplo} from '@/lib/catalogo';
import {medidaTexto} from '@/lib/busca-medida';
export function generateStaticParams(){return produtosExemplo.map(p=>({sku:p.sku}));}
export async function generateMetadata({params}:{params:Promise<{sku:string}>}){const {sku}=await params;const p=produtosExemplo.find(p=>p.sku===sku);return {title:p?`${p.marca} ${p.modelo} ${medidaTexto(p)}`:'Pneu',description:p?.descricao};}
export default async function Page({params}:{params:Promise<{sku:string}>}){return <ProductPage sku={(await params).sku}/>}

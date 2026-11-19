import type {MetadataRoute} from 'next';
import {site} from '@/config/site';
import {produtosExemplo} from '@/lib/catalogo';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return ['','pneus/','servicos/','guia/','politica-de-privacidade/',...produtosExemplo.map(p=>`pneu/${p.sku}/`)].map(path=>({url:site.url+'/'+path,changeFrequency:'weekly',priority:path?0.7:1}));}

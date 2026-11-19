'use client';
import {useState} from 'react';
import {Pause,Play} from 'lucide-react';
import {SiteImage} from './site-paths';

const marcas = [
 {nome:'Continental',arquivo:'continental'},
 {nome:'Dynamo',arquivo:'dynamo'},
 {nome:'Michelin',arquivo:'michelin'},
 {nome:'Firestone',arquivo:'firestone'},
 {nome:'Bridgestone',arquivo:'bridgestone'},
 {nome:'Goodyear',arquivo:'goodyear'},
 {nome:'Pirelli',arquivo:'pirelli'},
];

export function BrandCarousel(){
 const [pausado,setPausado]=useState(false);
 return <section className="brand-carousel" aria-labelledby="marcas-titulo">
  <div className="container brand-carousel-layout">
   <div className="brand-carousel-heading">
    <h2 id="marcas-titulo">Marcas que <br/>trabalhamos</h2>
    <button className="brand-carousel-toggle" type="button" aria-pressed={pausado} aria-label={pausado?'Retomar carrossel de marcas':'Pausar carrossel de marcas'} onClick={()=>setPausado(v=>!v)}>
     {pausado?<Play size={15}/>:<Pause size={15}/>}{pausado?'Retomar':'Pausar'}
    </button>
   </div>
   <div className="brand-carousel-window" tabIndex={0} role="region" aria-label="Marcas: Continental, Dynamo, Michelin, Firestone, Bridgestone, Goodyear e Pirelli">
    <div className={`brand-carousel-track${pausado?' is-paused':''}`}>
     {[0,1].map(copia=><ul className="brand-carousel-group" key={copia} aria-hidden={copia===1?true:undefined}>
      {marcas.map(m=><li className="brand-carousel-card" key={m.arquivo}><SiteImage src={`/marcas/${m.arquivo}.png`} alt={copia===0?m.nome:''} width={150} height={70} loading="eager" draggable={false}/></li>)}
     </ul>)}
    </div>
   </div>
  </div>
 </section>;
}

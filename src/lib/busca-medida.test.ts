import {describe,it,expect} from 'vitest';
import {opcoes,mudarMedida,medidaUrl,restaurarMedida,equivalentes,medidaTexto,diametro} from './busca-medida';
import {produtosExemplo,validar} from './catalogo';
import {mensagemProduto,mensagemLista,whatsapp} from './whatsapp';
import type {Medida,Produto} from './types';
const base=produtosExemplo[0];
const fixture:Produto[]=[{...base,sku:'a',largura:205,perfil:55,aro:16},{...base,sku:'b',largura:205,perfil:55,aro:17},{...base,sku:'c',largura:205,perfil:60,aro:16},{...base,sku:'d',largura:175,perfil:65,aro:14},{...base,sku:'e',categoria:'caminhao-onibus',largura:1000,perfil:null,aro:20},{...base,sku:'f',categoria:'caminhao-onibus',largura:215,perfil:75,aro:17.5},{...base,sku:'g',categoria:'caminhao-onibus',largura:215,perfil:75,aro:19.5}];
describe('Busca por medida',()=>{
it('lista somente larguras da categoria com contagem e ordem numérica',()=>{expect(opcoes(fixture,'carros','largura')).toEqual([{value:'175',count:1,label:'175'},{value:'205',count:3,label:'205'}]);expect(opcoes(fixture,'caminhao-onibus','largura').map(x=>x.value)).toEqual(['215','1000']);});
it('restringe perfil à largura e aro ao par largura/perfil',()=>{expect(opcoes(fixture,'carros','perfil','205').map(x=>[x.value,x.count])).toEqual([['55',2],['60',1]]);expect(opcoes(fixture,'carros','aro','205','60').map(x=>x.value)).toEqual(['16']);expect(opcoes(fixture,'carros','perfil','999')).toEqual([]);});
it('suporta aros decimais e sem perfil',()=>{expect(opcoes(fixture,'caminhao-onibus','aro','215','75').map(x=>x.value)).toEqual(['17.5','19.5']);expect(opcoes(fixture,'caminhao-onibus','perfil','1000')[0]).toEqual({value:'sem-perfil',label:'Sem perfil',count:1});});
it('limpa as etapas seguintes',()=>{const m:Medida={categoria:'carros',largura:'205',perfil:'55',aro:'16'};expect(mudarMedida(m,'largura','175')).toEqual({...m,largura:'175',perfil:'',aro:''});expect(mudarMedida(m,'perfil','60').aro).toBe('');expect(mudarMedida(m,'categoria','vans')).toEqual({categoria:'vans',largura:'',perfil:'',aro:''});});
it('restaura a URL compartilhável inclusive decimais',()=>{const m:Medida={categoria:'caminhao-onibus',largura:'215',perfil:'75',aro:'17.5'};expect(restaurarMedida(new URL(medidaUrl(m),'https://example.org').searchParams)).toEqual(m);});
it('preserva o C de pneus comerciais',()=>expect(medidaTexto({...base,largura:205,perfil:70,aro:15,sufixo:'C'})).toBe('205/70 R15C'));
it('calcula diâmetro e limita equivalências por categoria, aro e 3%',()=>{expect(diametro(205,55,16)).toBeCloseTo(631.9);const items=[{...base,sku:'ok',largura:225,perfil:45,aro:17},{...base,sku:'fora',largura:255,perfil:65,aro:17},{...base,sku:'categoria',categoria:'vans' as const,largura:225,perfil:45,aro:17}];expect(equivalentes(items,{categoria:'carros',largura:'205',perfil:'55',aro:'16'}).map(x=>x.produto.sku)).toEqual(['ok']);expect(equivalentes(items,{categoria:'carros',largura:'1000',perfil:'sem-perfil',aro:'20'})).toEqual([]);});
});
describe('Catálogo e WhatsApp',()=>{
it('tem 40 exemplos, três categorias e aros de carro 13 a 20',()=>{expect(produtosExemplo).toHaveLength(40);expect(new Set(produtosExemplo.map(p=>p.categoria)).size).toBe(3);expect([...new Set(produtosExemplo.filter(p=>p.categoria==='carros').map(p=>p.aro))]).toEqual([13,14,15,16,17,18,19,20]);});
it('normaliza CSV brasileiro, ignora inativos e inválidos',()=>{const r=validar([{...base,preco:'1.489,90',ativo:'sim'},{...base,sku:'off',ativo:'não'},{...base,sku:'bad',aro:'abc'}]);expect(r).toHaveLength(1);expect(r[0].preco).toBe(1489.9);});
it('inclui produto, quantidade e serviços, com URL codificada',()=>{const msg=mensagemProduto(base,4,['Alinhamento']);expect(msg).toContain('4x');expect(msg).toContain(base.sku);expect(msg).toContain('Alinhamento');expect(new URL(whatsapp(msg)).searchParams.get('text')).toBe(msg);expect(mensagemLista([{produto:base,quantidade:2}],['Balanceamento'],'João','Gol 2020')).toContain('Veículo: Gol 2020');});
});

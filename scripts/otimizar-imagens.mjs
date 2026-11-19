import sharp from 'sharp';
import fs from 'node:fs';
for(let n=1;n<=3;n++)await sharp(`public/produtos/pneu-${n}.png`).resize({width:600,withoutEnlargement:true}).webp({quality:82}).toFile(`public/produtos/pneu-${n}.webp`);
await sharp('public/loja.jpg').resize({width:1200,withoutEnlargement:true}).webp({quality:83}).toFile('public/loja.webp');
for(const path of ['src/data/produtos-exemplo.json','docs/modelo-planilha.csv','src/components/catalogo-app.tsx','src/app/layout.tsx']){const s=fs.readFileSync(path,'utf8');fs.writeFileSync(path,s.replace(/pneu-(\d)\.png/g,'pneu-$1.webp').replace(/loja\.jpg/g,'loja.webp'));}

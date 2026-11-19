# Flacar Pneus

## Publicação no GitHub Pages

O fluxo `.github/workflows/pages.yml` testa, compila e publica automaticamente a branch `main`. No repositório, habilite **Settings > Pages > Source: GitHub Actions**. O endereço final será informado pela execução do workflow. Os caminhos são configurados automaticamente para a subpasta do repositório, inclusive imagens, busca e links de produto. O catálogo publicado será público; confirme os dados reais antes de divulgação comercial.

Para reproduzir uma publicação em subpasta localmente, defina `NEXT_PUBLIC_BASE_PATH=/flacar-pneus` e `NEXT_PUBLIC_SITE_URL=https://SEU-USUARIO.github.io/flacar-pneus` durante o build. Sem essas variáveis, a hospedagem na raiz continua funcionando.

Catálogo estático em Next.js (App Router), TypeScript e Tailwind, sem checkout. O cliente pesquisa medidas e consulta a loja pelo WhatsApp.

## Rodar

Requer Node.js 20.9 ou superior (recomendado Node 24).

```sh
npm install
npm run dev
npm test
npm run build
```

Abra http://localhost:3000. O build produz `out/`; publique **o conteúdo dessa pasta** na raiz de uma hospedagem estática. Habilite o uso de `index.html` nas pastas. Não é necessário servidor Node em produção. Não publique a pasta `node_modules`.

## Configurar a loja

Edite `src/config/site.ts`: telefone, atendente, saudação, endereço, horário, links de mapas, redes sociais, CNPJ, serviços de mecânica e URL do domínio. Os campos com TODO precisam de confirmação. Os campos vazios não inventam endereço, CNPJ ou serviços. Revise também os diferenciais antes de usar comercialmente. O horário é o valor provisório solicitado.

`mostrarPrecos: false` oculta preços e ordenação por valor. Os preços dos exemplos são fictícios. A faixa de demonstração aparece quando falta a planilha e também quando ela falha, para evitar que o fallback seja confundido com estoque real.

## Planilha como painel

Modelo pronto: `docs/modelo-planilha.csv`, com 40 linhas de demonstração. Substitua-as pelos pneus reais antes de publicar sua planilha. A planilha precisa ser pública; nunca coloque dados de clientes nela.

1. No Google Sheets, crie uma planilha. Em **Arquivo > Importar > Fazer upload**, envie o modelo CSV e escolha separador vírgula.
2. Renomeie a aba para **Produtos**. Preserve os cabeçalhos.
3. Cadastre SKU único, categoria (`carros`, `vans`, `caminhao-onibus`), marca, modelo, largura e aro. Perfil vazio significa sem perfil. Use `C` em sufixo para pneus comerciais. Índices são texto; aros decimais devem usar ponto (17.5).
4. Campos booleanos usam `sim` ou `não`: ativo, runflat, xl, oferta e destaque. Preços aceitam `489.90` ou `489,90`; valores em branco ficam sob consulta.
5. Publique em **Arquivo > Compartilhar > Publicar na Web**:

```text
┌ Publicar na Web ─────────────────────┐
│ Aba: Produtos                       │
│ Formato: Valores separados por CSV  │
│ [Publicar]                          │
└─────────────────────────────────────┘
```

6. Copie o ID da URL normal de edição (não o endereço `/d/e/` da publicação):

```text
https://docs.google.com/spreadsheets/d/ESTE_E_O_ID/edit
                                      ^^^^^^^^^^^
src/config/site.ts → planilhaId: 'ESTE_E_O_ID'
```

7. Faça novo build após mudar a configuração. As alterações posteriores nas células são lidas em tempo de execução via `gviz/tq?tqx=out:csv&sheet=Produtos`. O cache em memória dura dez minutos; recarregar a página reinicia a memória, e o próprio Google pode levar algum tempo para atualizar a publicação.
8. `foto_url` aceita `/produtos/nome.webp` (copie o arquivo para `public/produtos/` e faça novo build) ou URL HTTPS pública direta. Para Google Drive, habilite **Qualquer pessoa com o link** e use `https://drive.google.com/thumbnail?id=ID_DO_ARQUIVO&sz=w800`. Confira em janela anônima: o Drive pode impor limites; prefira arquivos locais para estabilidade.
9. Para oferta, preencha `oferta = sim`, `preco` e opcionalmente `preco_de` maior que o preço atual. Para tirar do ar: `ativo = não`.

Zod ignora linhas inválidas e duplicatas de SKU; veja o console do navegador. Falha de rede, planilha privada, HTML em vez de CSV ou ausência de produtos válidos ativam o catálogo de demonstração com aviso visível.

## Rotas estáticas e produtos novos

As páginas `/pneu/EX-001/` a `/pneu/EX-040/` são pré-geradas. Como um export estático não cria rotas novas em tempo de execução, SKUs novos da planilha usam `/pneu/?sku=CODIGO`, com o mesmo conteúdo e funções. Não é necessário rebuild para consultá-los. Para SEO individual com URL `/pneu/CODIGO/`, inclua os produtos no conjunto de build e gere novamente. O sitemap atual cobre as páginas fixas e os 40 exemplos, conforme o escopo solicitado.

## Imagens e marca

A marca JPEG e as três imagens de pneu fornecidas foram copiadas de seus arquivos. Não são vetores oficiais. Para usar os logos finais, adicione `public/logo-flacar.svg` e `public/logo-flacar-claro.svg` e atualize `logo` e `logoClaro` no config. As categorias em `public/categorias/` são SVGs originais provisórios; substitua por fotos próprias e ajuste as extensões no componente. Logos de fabricantes não foram usados sem confirmação de autorização. A foto da fachada está em `public/loja.jpg`. O vídeo não foi embutido para manter a navegação leve.

## Busca, segurança e dados locais

`src/lib/busca-medida.ts` contém funções puras testadas: opções com contagem, dependências, ordenação numérica, perfil ausente, aros decimais, URL e equivalência. A equivalência de até ±3% é apenas uma aproximação e não determina compatibilidade com o veículo. Medidas sem perfil ficam fora desse cálculo.

`src/lib/whatsapp.ts` é a única origem dos links e mensagens. A consulta é salva no localStorage com tratamento de erro; nome e veículo opcionais ficam só na memória até o cliente abrir o WhatsApp. Não há cadastro, checkout ou coleta automática desses dados pela aplicação. Revise o texto LGPD para refletir os processos reais da loja.

## Verificação e desempenho

Execute `npm test` e `npm run build` antes de publicar. Verifique em celular os filtros, produtos novos, consulta e links de WhatsApp. Lighthouse ≥90 é uma meta a aferir no domínio definitivo; não é garantido somente pelo build. Fotos externas e Google Fonts dependem da rede. Confirme endereço, horários e dados estruturados antes da publicação comercial.

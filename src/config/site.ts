export const site = {
 nome: 'Flacar Pneus', whatsapp: '5562991476407', whatsappDisplay: '(62) 99147-6407', atendente: 'Flávia',
 whatsappSaudacao: 'Olá, Flávia! Vim pelo site da Flacar Pneus.',
 endereco: {rua:'',bairro:'',cidade:'',uf:'',cep:'',mapsLink:'',mapsEmbedUrl:''}, // TODO confirmar endereço
 horario:'Seg a sex 8h–18h · Sáb 8h–12h', // TODO confirmar
 instagram:'',facebook:'',cnpj:'',planilhaId:'', // TODO preencher
 mostrarPrecos:true, url:process.env.NEXT_PUBLIC_SITE_URL || 'https://flacar-pneus-catalogo.johnathan87.chatgpt.site',
 logo:'/logo-flacar.jpeg', logoClaro:'/logo-flacar.jpeg',
 mecanica: [] as string[], // TODO confirmar serviços (freios, suspensão, óleo)
 tempoServico:'Consulte o tempo estimado pelo WhatsApp.', // TODO confirmar
 diferenciais:['Atendimento direto com a Flávia','Montagem e balanceamento na loja','Orientação na escolha da medida','Alinhamento e mecânica no mesmo lugar'], // TODO confirmar
};

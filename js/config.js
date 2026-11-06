/**
 * ============================================================
 *  CONFIG.JS — PAINEL DE PERSONALIZAÇÃO
 * ============================================================
 *  Este é o ÚNICO arquivo que você precisa editar para trocar
 *  fotos, textos, datas e músicas do site.
 *
 *  Não é necessário mexer em HTML, CSS ou nos outros arquivos
 *  JavaScript para fazer essas alterações.
 *
 *  Leia o README.md para instruções detalhadas, com exemplos.
 * ============================================================
 */

const SITE_CONFIG = {

  // ----------------------------------------------------------
  // 1. CASAL — nomes e título geral do site
  // ----------------------------------------------------------
  casal: {
    namorado: "Lucas Gabriel",
    namorada: "Brenda",
    // Aparece na aba do navegador e em alguns títulos de seção
    titulo: "Nosso primeiro capítulo"
  },

  // ----------------------------------------------------------
  // 2. DATAS — use sempre o formato "AAAA-MM-DD"
  // ----------------------------------------------------------
  datas: {
    // Data/hora em que o namoro começou (usada no contador).
    // Pode incluir horário: "2026-10-06T20:30:00"
    inicioRelacionamento: "2026-10-06T00:00:00",

    // Data em que vocês se conheceram (apenas informativa,
    // pode ser usada em textos ou na linha do tempo)
    primeiroEncontro: "2026-06-10"
  },

  // ----------------------------------------------------------
  // 3. SEÇÃO 1 — ABERTURA / HERO
  // ----------------------------------------------------------
  hero: {
    titulo: "NOSSO PRIMEIRO CAPÍTULO",
    subtitulo: "Um presente feito com muito amor para o amor da minha vida",
    // Caminho relativo da fotografia principal.
    // Coloque o arquivo dentro de assets/images/hero/
    imagem: "assets/images/hero/hero-principal.jpg",
    // Texto do botão que leva até a seção "Nossa História"
    textoBotao: "Comece o TOUR!"
  },

  // ----------------------------------------------------------
  // 4. SEÇÃO 2 — NOSSO TEMPO JUNTOS (contador)
  // ----------------------------------------------------------
  contador: {
    // Frase exibida abaixo dos números do contador
    frase: ""
  },

  // ----------------------------------------------------------
  // 5. SEÇÃO 3 — LINHA DO TEMPO
  // ----------------------------------------------------------
  // Adicione, remova ou edite quantos momentos quiser.
  // Os itens são ordenados automaticamente pela data.
  // Se não tiver uma fotografia ainda, deixe o campo "imagem"
  // vazio ("") que o site mostra um espaço reservado elegante.
  timeline: [
    {
      data: "2026-07-05",
      titulo: "Nosso primeiro registro juntos",
      descricao: "Quase te matei engasgada com suco de maracujá, e você foi embora sem me dar um thau",
      imagem: "assets/images/timeline/dia.jpg"
    },
     {
      data: "2026-07-16",
      titulo: "Dia do spoleto",
      descricao: "Uns dos meus dia favoritos, pude passar praticamento o dia inteiro ao seu lado, conversamos sobre tudo, lembro que fui para casa com a mandibula doendo de tanto sorrir.",
      imagem: "assets/images/timeline/dai2.jpg"
    },
     {
      data: "2026-08-03",
      titulo: "Shopping com sua irmã",
      descricao: "Um dia antes de voce viajar, assumo que ja estava com saudades de voce. Nota se sua boca bem ferida, tinha poucos dias da Grande festa do falsinho, acho que exagerei um pouco.",
      imagem: "assets/images/timeline/dia3.jpg"
    },
     {
      data: "2026-08-23",
      titulo: "Arcos",
      descricao: "Ah, esse dia. Meu amor estava tao linda, nossa conexao é tão forte que chegamos com roupas combinando. Lembro que chegou fechada, fiquei sem entender um pouco, mas logo se soltou. Nesse tomei atitude e falei abetamente sobre o que sentia por você e o que eu realmente queria, foi um alivio poder te contar.",
      imagem: "assets/images/timeline/dia4.jpg"
    },
     {
      data: "2026-09-02",
      titulo: "Wingardium LeviOOOsa",
      descricao: "Dia que fomos assistir harry potter, foi incrivel ver o filme com voce, no mesmo dia experimentei o seu bolo de cenoura, estava muito gostoso.",
      imagem: "assets/images/timeline/dia5.jpg"
    },
    {
      data: "2026-10-08",
      titulo: "Dia em que te mostrei as alianças",
      descricao: "Um otimo dia, fomos ao barril, comemos, bebemos, viemos para casa onde te mostrei as alianças, mas tive que trocar, enfim estavamos realmentemente namorandoo.",
      imagem: "assets/images/timeline/LINHA.jpg"
    },
    {
      data: "2026-07-05",
      titulo: "Nosso momento de casal",
      descricao: "Até hoje não lembro como ficamos tão juntos lá, eu estava tao deprimido, mas depois nem liguei mais, e foi ótimo. Ficar ao seu laod, grudadinho com voce, ali ja queria voce como namorada de tao bom que foi ficar perto de ti.",
      imagem: "assets/images/timeline/pium.png"
    }
    
    

    
    // Copie o bloco acima para adicionar mais momentos.
  ],

  // ----------------------------------------------------------
  // 6. SEÇÃO 4 — GALERIA
  // ----------------------------------------------------------
  // Coloque as fotos dentro de assets/images/gallery/
  // "orientacao" aceita: "retrato", "paisagem" ou "quadrada"
  // (isso ajuda o layout tipo álbum a ficar bonito)
  galeria: [
    {
      imagem: "assets/images/gallery/foto-01.jpg",
      legenda: "Sorvetee",
      orientacao: "retrato"
    },
    {
      imagem: "assets/images/gallery/foto-02.jpg",
      legenda: "Amor chorando pelo pium - TO",
      orientacao: "paisagem"
    },
     {
      imagem: "assets/images/gallery/foto-03.jpg",
      legenda: "Parque com amorzinho",
      orientacao: "paisagem"
    },
     {
      imagem: "assets/images/gallery/foto-04.jpg",
      legenda: "Show do Luan Santana com meu amor",
      orientacao: "paisagem"
    },
     {
      imagem: "assets/images/gallery/foto-05.jpg",
      legenda: "Feira com amorzinho, estava com tanta saudade",
      orientacao: "paisagem"
    },
     {
      imagem: "assets/images/gallery/fotol-06.jpg",
      legenda: "Voce disse que gosta dessa foto",
      orientacao: "paisagem"
    }
    // Copie o bloco acima para adicionar mais fotos.
  ],

  // ----------------------------------------------------------
  // 7. SEÇÃO 5 — TRILHA SONORA
  // ----------------------------------------------------------
  // Coloque os arquivos de áudio dentro de assets/music/
  // Formatos recomendados: .mp3
  // Se a lista ficar vazia, o site mostra uma mensagem
  // elegante dizendo onde inserir as músicas.
  playlist: [
    {
      titulo: "Pras damas",
      artista: "Oriente",
      arquivo: "assets/music/musica-01.mp3",
      capa: "assets/music/capa-01.jpg" 
    },
    {
      titulo: "Legendary Lovers",
      artista: "Katy perry",
      arquivo: "assets/music/musica-02.mp3",
      capa: "assets/music/capa-02.jpg" 
    },
    {
      titulo: "A droga do amor",
      artista: "Ari, Felipe Play, Dom R, Tiankris",
      arquivo: "assets/music/musica-03.mp3",
      capa: "assets/music/capa-03.jpg" 
    },
    {
      titulo: "Cobertor",
      artista: "Anitta, Projota",
      arquivo: "assets/music/musica-04.mp3",
      capa: "assets/music/capa-04.jpg" 
    }, 
    {
      titulo: "Tudo que você quiser",
      artista: "Luan Santana",
      arquivo: "assets/music/musica-05.mp3",
      capa: "assets/music/capa-05.jpg" 
    },
    {
      titulo: "Palácios e Castelos",
      artista: "João Gomes",
      arquivo: "assets/music/musica-06.mp3",
      capa: "assets/music/capa-06.jpg" 
    }




    // Copie o bloco acima para adicionar mais músicas.
  ],

  // ----------------------------------------------------------
  // 8. SEÇÃO 6 — PEQUENAS COISAS QUE AMO EM VOCÊ
  // ----------------------------------------------------------
  // "titulo" é a chamada curta do cartão (sempre visível).
  // "mensagem" aparece quando o cartão é clicado/revelado.
  cartoes: [
    {
      titulo: "Seu sorriso",
      mensagem: "O seu sorriso tem o poder de iluminar meu dia inteiro, mesmo quando tudo parece difícil. É a primeira coisa que busco quando preciso de um motivo para sorrir também."
    },
    {
      titulo: "Seu jeito",
      mensagem: "Amo o seu jeito único de ser: a forma como você cuida de tudo com carinho, como se importa com os detalhes e como transforma momentos simples em especiais."
    },
    {
      titulo: "Sua companhia",
      mensagem: "Estar ao seu lado é o meu lugar favorito no mundo. Sua companhia traz paz, leveza e uma sensação de que tudo vai ficar bem."
    },
    {
      titulo: "Nossos momentos",
      mensagem: "Cada momento ao seu lado vira uma lembrança que guardo com carinho. São nossas risadas, nossas conversas e nossos silêncios confortáveis que tornam tudo mais bonito."
    },
    {
      titulo: "Seus detalhes",
      mensagem: "São os seus pequenos detalhes que me conquistam todos os dias: o jeito que você fala, que olha, que se importa. Tudo em você é especial."
    }
],

  // ----------------------------------------------------------
  // 9. SEÇÃO 7 — CARTA ESPECIAL
  // ----------------------------------------------------------
  carta: {
    titulo: "UMA CARTA PARA VOCÊ",
    saudacao: "Para alguém que eu amo muito",
    paragrafos: [
      "Meu amor, eu te amo tanto que me torno incapaz de de imaginar um vida sem você. Cada detalhe em sua personalidade e corpo, cada palavra de carinho que me difere e cada esforço que faz por nos, tudo isso me faz mais apaixonado em você a cada dia que passa.",
      "Eu amo te amar, e quero te dar uma vida de felicidade, quero te dar um amor paciente, onde tudo perdoa, um amor benigno, onde ultrapassa o abstrato da palavra e chega pra cuidar com doçura de quem eu amo tanto, mesmo que venha adversidades estarei sempre ao seu lado meu amor."
      // Adicione quantas linhas de texto quiser.
    ],
    assinatura: "Com amor, Lucas Gabriel"
  },

  // ----------------------------------------------------------
  // 10. SEÇÃO 8 — NOSSO PRÓXIMO CAPÍTULO
  // ----------------------------------------------------------
  proximoCapitulo: {
    frase: "Isso é só o começo da nossa história.",
    imagem: "assets/images/details/foto-final.jpg",
    textoBotao: "Voltar ao início"
  },

  // ----------------------------------------------------------
  // 11. SEÇÃO 9 — SURPRESA ESCONDIDA (opcional)
  // ----------------------------------------------------------
  surpresa: {
    // Se "ativa" for false, o botão de surpresa não aparece.
    ativa: true,
    textoBotao: "psiu, clique aqui",
    mensagem: "O amor é sofredor, é benigno; o amor não é invejoso; o amor não trata com leviandade, não se ensoberbece. Não se porta com indecência, não busca os seus interesses, não se irrita, não suspeita mal; não se regozija com a injustiça, mas regozija-se com a verdade; tudo sofre, tudo crê, tudo espera, tudo suporta"
  }

};

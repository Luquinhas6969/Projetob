# Nosso primeiro capítulo 🤍

Um álbum digital interativo para comemorar seu primeiro mês de namoro — editável em um único arquivo (`js/config.js`), sem precisar mexer na estrutura do site.

---

## 1. Como abrir o projeto

**Opção simples:** dê duplo clique em `index.html` e ele abrirá no navegador.

**Opção recomendada (evita pequenos bugs de carregamento de imagem/áudio):** use a extensão **Live Server** no VS Code:
1. Abra a pasta do projeto no VS Code.
2. Instale a extensão "Live Server" (se ainda não tiver).
3. Clique com o botão direito em `index.html` → **Open with Live Server**.

---

## 2. Onde colocar as fotografias

Todas as imagens ficam dentro de `assets/images/`, organizadas em subpastas:

```
assets/images/hero/       → foto principal da abertura
assets/images/timeline/   → fotos da linha do tempo
assets/images/gallery/    → fotos da galeria
assets/images/details/    → foto da seção final ("Nosso próximo capítulo")
```

## 3. Como nomear as fotografias

Use nomes simples, sem espaços ou acentos, por exemplo:
`foto-principal.jpg`, `momento-01.jpg`, `galeria-03.jpg`.

Formatos aceitos: `.jpg`, `.jpeg`, `.png`, `.webp`.

Se uma imagem não existir ou o caminho estiver errado, o site **não quebra** — ele mostra um espaço reservado elegante no lugar.

## 4. Como inserir a fotografia da página inicial

1. Coloque o arquivo em `assets/images/hero/`, por exemplo `foto-principal.jpg`.
2. Abra `js/config.js` e edite:

```js
hero: {
    ...
    imagem: "assets/images/hero/foto-principal.jpg"
}
```

## 5. Como adicionar momentos na linha do tempo

No `js/config.js`, dentro de `timeline`, copie um bloco e preencha:

```js
timeline: [
    {
        data: "2025-02-05",
        titulo: "O dia em que nos conhecemos",
        descricao: "Escreva aqui a sua lembrança desse dia.",
        imagem: "assets/images/timeline/momento-01.jpg"
    },
    {
        data: "2026-10-06",
        titulo: "O primeiro 'sim'",
        descricao: "Escreva aqui outra lembrança.",
        imagem: "assets/images/timeline/momento-02.jpg"
    }
]
```

Os itens aparecem automaticamente em ordem cronológica — não precisa se preocupar com a ordem em que você os escreve. Deixe `imagem: ""` se ainda não tiver a foto.

## 6. Como adicionar imagens na galeria

No `js/config.js`, dentro de `galeria`:

```js
galeria: [
    {
        imagem: "assets/images/gallery/foto-01.jpg",
        legenda: "Nosso primeiro passeio",
        orientacao: "retrato"
    }
]
```

Clique em qualquer foto no site para abri-la ampliada (lightbox), com navegação entre as fotos.

## 7. Como adicionar músicas

1. Coloque os arquivos de áudio (`.mp3`) dentro de `assets/music/`.
2. No `js/config.js`, dentro de `playlist`:

```js
playlist: [
    {
        titulo: "Nome da música",
        artista: "Nome do artista",
        arquivo: "assets/music/musica-01.mp3",
        capa: "" // opcional
    }
]
```

Se a playlist ficar vazia, o site mostra uma mensagem explicando onde adicionar as músicas, em vez de quebrar.

> O site nunca toca áudio automaticamente — a música só começa quando a pessoa clicar em play, respeitando as políticas dos navegadores e a experiência de quem está vendo o site.

## 8. Como editar os textos

Praticamente todo o texto do site mora em `js/config.js`: título, subtítulo, frase do contador, cartões ("Pequenas coisas que amo em você"), carta especial, frase final e mensagem surpresa. Basta localizar o campo (cada um tem um comentário explicando o que é) e substituir o texto `"INSIRA..."` pelo seu conteúdo.

## 9. Como modificar as datas

Use sempre o formato `AAAA-MM-DD` (ano-mês-dia). Exemplo: 6 de outubro de 2026 vira `"2026-10-06"`.

A data mais importante é `datas.inicioRelacionamento` — é ela que alimenta o contador de dias/horas/minutos/segundos da seção "Nosso tempo juntos". Você pode incluir um horário específico assim: `"2026-10-06T20:30:00"`.

## 10. Como alterar as cores

As cores do site estão centralizadas no topo do arquivo `css/style.css`, dentro de `:root`:

```css
:root {
  --color-cream: #F7F2EA;
  --color-offwhite: #FCFAF6;
  --color-wine: #713B48;
  --color-rose: #D9B7B5;
  --color-soft-brown: #82766D;
  --color-gold: #B69A70;
  --color-text: #332D2B;
}
```

Basta trocar os valores hexadecimais — todo o site usa essas variáveis, então a mudança se aplica automaticamente em todas as seções.

## 11. Como publicar gratuitamente no Cloudflare Pages

1. Crie uma conta gratuita em [pages.cloudflare.com](https://pages.cloudflare.com).
2. Clique em **Create a project** → **Upload assets** (ou conecte um repositório do GitHub, se preferir versionar o projeto lá).
3. Se for upload direto: arraste a pasta inteira do projeto (`nosso-primeiro-capitulo`) para a área de upload.
4. Aguarde a publicação — você receberá um link do tipo `seu-projeto.pages.dev` para compartilhar.

**Alternativa — GitHub Pages:**
1. Crie um repositório no GitHub e envie os arquivos do projeto.
2. Vá em **Settings → Pages**.
3. Em "Branch", selecione a branch principal (`main`) e a pasta raiz (`/`).
4. Salve — o GitHub fornecerá um link `https://seu-usuario.github.io/seu-repositorio/`.

---

## Estrutura do projeto

```
nosso-primeiro-capitulo/
│
├── index.html
├── README.md
│
├── assets/
│   ├── images/
│   │   ├── hero/
│   │   ├── timeline/
│   │   ├── gallery/
│   │   └── details/
│   ├── music/
│   └── icons/
│
├── css/
│   ├── style.css         → cores, tipografia e layout
│   ├── animations.css    → animações e reduced-motion
│   └── responsive.css    → ajustes para celular/tablet/desktop
│
└── js/
    ├── config.js          → ⭐ ARQUIVO DE PERSONALIZAÇÃO
    ├── main.js             → preenche o site com os dados do config.js
    ├── music.js            → player de música
    └── interactions.js     → contador, menu, lightbox, carta, animações
```

## Checklist antes de enviar para ela 💌

- [ ] Nomes do casal preenchidos em `config.js`
- [ ] Data de início do namoro configurada
- [ ] Foto principal (hero) adicionada
- [ ] Pelo menos alguns momentos na linha do tempo
- [ ] Fotos na galeria
- [ ] Música(s), se desejar
- [ ] Cartões de "Pequenas coisas que amo em você" preenchidos
- [ ] Carta especial escrita
- [ ] Frase final escrita
- [ ] Testado no celular (é por onde ela provavelmente vai acessar)

Boa sorte — e feliz um mês! 🤎

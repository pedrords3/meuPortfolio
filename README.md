# Portfólio — Pedro Rodrigues

Site publicado em **https://pedrords3.github.io/meuPortfolio/** (GitHub Pages, branch `main`).

HTML, CSS e JavaScript puros: sem build, sem dependências além de Google Fonts e Bootstrap Icons (CDN).

## Estrutura

```
index.html                     página única (PT/EN)
assets/
  css/main.css                 identidade visual e layout
  js/main.js                   animações, idioma, modais e player da música
  js/projetos.js               mídias de cada projeto (galeria "Mídias")
  img/                         foto de perfil e ícone
  audio/four-years-on.mp3      música autoral (player discreto no rodapé)
  projetos/<projeto>/          banners, prints e vídeos de cada projeto
  projetos/sem-contexto/
    telas/                     prints da versão para PC
    evolucao/                  prints do protótipo e do desenvolvimento
    video/                     vídeo dos bastidores no editor + capa
```

Os originais em alta resolução ficam em `SemContexto Midias/`, que está no `.gitignore` e não vai para o site.
O site usa cópias em JPG reduzidas.

## Textos e idioma

O texto em português fica no próprio HTML; a versão em inglês vai no atributo `data-en`
do mesmo elemento. O botão PT/EN troca um pelo outro e lembra a escolha no navegador.

## Adicionar mídias a um projeto

Edite `assets/js/projetos.js`. Cada item tem `type` (`'video'` ou `'image'`), `title` e
`description` em `{ pt, en }`, `path` e, para vídeos, `thumbnail`. O botão que abre a galeria
usa `data-project="<chave>"`.

## Sem Contexto

O jogo tem site próprio: **https://pedrords3.github.io/sem-contexto/**. É de lá que os jogadores
abrem a versão web e baixam a versão para PC, então o portfólio só aponta para esse site
(botão "Conhecer o jogo") e mostra os prints e os bastidores do desenvolvimento.

A release `v1.0.0` deste repositório (`SemContexto3D-Windows.zip`) continua publicada, mas o
portfólio não aponta mais para ela.

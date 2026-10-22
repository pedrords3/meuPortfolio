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
    telas/                     prints da versão atual (1.0)
    evolucao/                  prints do protótipo e do desenvolvimento
    video/                     vídeo dos bastidores no editor + capa
    expressoes/                close-ups das expressões (bolinhas abaixo do título)
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

## Sem Contexto 3D: navegador e download

A versão para navegador fica em https://sem-contexto.onrender.com/ (o botão "Jogar no navegador").

O jogo (~109 MB) é grande demais para ficar no repositório (limite de 100 MB por arquivo),
então ele é publicado como **GitHub Release**. O botão do site aponta para:

```
https://github.com/pedrords3/meuPortfolio/releases/latest/download/SemContexto3D-Windows.zip
```

Esse link sempre baixa o arquivo da release mais recente. Para publicar uma versão nova:

1. Gere o build na Unity e compacte a pasta `SemContexto3D` (sem a pasta
   `SemContexto3D_BackUpThisFolder_ButDontShipItWithYourGame`) como `SemContexto3D-Windows.zip`.
   No Windows, `tar -a -c -f SemContexto3D-Windows.zip SemContexto3D` gera um zip padrão.
2. Em **github.com/pedrords3/meuPortfolio → Releases → Draft a new release**, crie uma tag
   (ex.: `v0.2.0`), escreva as notas e anexe o zip **com exatamente esse nome**.
3. Publique. Se o tamanho mudar bastante, atualize o "109 MB" no `index.html`.

# Acquamar — Moda Praia Premium · Garopaba/SC

E-commerce estático (HTML/CSS/JS puro, sem build) hospedado no GitHub Pages.
**Site:** https://nicolassalesbr-lang.github.io/acquamar-site/

---

## 🗂️ Estrutura

```
acquamar-site/
├── index.html          # Home (hero, categorias, best-sellers, story, lookbook, reviews, instagram, newsletter)
├── biquinis.html       # Categoria Biquínis (6 produtos)
├── maios.html          # Categoria Maiôs & Bodies (4 produtos)
├── saidas.html         # Categoria Saídas de Praia (3 produtos)
├── acessorios.html     # Categoria Acessórios (3 produtos)
├── guia-medidas.html   # Guia de medidas
├── historia.html       # Nossa história
├── assets/
│   ├── store.css       # Camada visual do e-commerce (drawers, modal, busca, toast)
│   └── store.js        # Motor do e-commerce (catálogo + carrinho + favoritos + busca + checkout)
└── images/             # Fotos reais das modelos (otimizadas p/ web, máx 1600px / ~300KB)
```

## 🛒 Funcionalidades de e-commerce (`assets/store.js`)

Tudo client-side, com estado persistido em `localStorage`:

- **Catálogo** central (`CATALOG`) com 16 produtos — preço, coleção, cores, tamanhos, descrição e imagem.
- **Carrinho lateral** (sacola): adicionar/remover, quantidade, barra de progresso de frete grátis (R$ 399), cupom **ACQUA10** (−10%) e **checkout via WhatsApp** com a mensagem do pedido já formatada.
- **Favoritos** (wishlist) no ícone de coração, com drawer próprio e "adicionar à sacola".
- **Busca** em tela cheia com chips de atalho e filtragem por nome/categoria/coleção.
- **Modal de produto** (abre ao clicar no card ou em "Escolher tamanho"): galeria, seletor de cor e tamanho com validação, quantidade, favoritar e link de dúvida no WhatsApp.
- **Filtros** das páginas de categoria (botões `.fb`) filtram os cards ao vivo.
- **Modais informativos** para os links do rodapé (Trocas, Rastreio, FAQ, Privacidade, Termos, Loja, Trabalhe conosco).
- Mosaico do **Instagram**, cookies e newsletter persistidos.

> **WhatsApp:** o número de checkout/atendimento está em `assets/store.js` na constante `WA` (`5548000000000`). Troque pelo número real da loja.

## 🖼️ Imagens

As fotos em `images/` são as fotos reais das modelos (origem: Google Drive da loja), já redimensionadas e comprimidas para web. Para trocar a foto de um produto, basta substituir o arquivo correspondente em `images/` mantendo o nome, ou atualizar o caminho `img:` no `CATALOG` dentro de `assets/store.js`.

## 🚀 Rodar localmente

```bash
python -m http.server 8000
# abra http://localhost:8000
```

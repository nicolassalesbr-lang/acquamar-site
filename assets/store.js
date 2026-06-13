/* ── Acquamar Store · motor e-commerce ──────────────────────
   Carrinho, favoritos, busca, modal de produto e checkout WhatsApp.
   Estado persistido em localStorage. */
(function () {
  'use strict';
  var WA = '5548000000000';
  var IG = 'https://www.instagram.com/';
  var FRETE_GRATIS = 399;

  /* ── Catálogo ── */
  var CATALOG = [
    { id: 'biq-cortininha', n: 'Biquíni Cortininha Com Laço', col: 'Coleção Garopaba', cat: 'Biquínis', pr: 349, img: 'images/loira2-e.jpg', tags: 'cortininha laco biquini conjunto', badge: ['pn', 'Novo'], colors: [['Terracota', '#c4693a'], ['Areia', '#e8d9c4'], ['Preto', '#1e1a16']], d: 'Top cortininha com amarração e laço nas costas, forro duplo e proteção UV50+. Modelagem que valoriza o colo sem abrir mão da segurança.' },
    { id: 'biq-bandeau', n: 'Biquíni Bandeau Argola', col: 'Coleção Maré', cat: 'Biquínis', pr: 319, img: 'images/produto-2.jpg', tags: 'bandeau argola biquini', badge: ['pn', 'Novo'], colors: [['Terracota', '#c4693a'], ['Preto', '#1e1a16'], ['Areia', '#e8d9c4'], ['Bege', '#c9b394']], d: 'Top bandeau com argola central e bojo removível. Tecido canelado de secagem rápida com elasticidade que acompanha o corpo.' },
    { id: 'biq-meia-taca', n: 'Biquíni Meia Taça Retrô', col: 'Coleção Sol Real', cat: 'Biquínis', pr: 369, img: 'images/modelo1-c.jpg', tags: 'meia taca retro biquini', colors: [['Azul Maré', '#7da4b8'], ['Terracota', '#c4693a']], d: 'Inspiração vintage com sustentação real: taça estruturada, base firme e calcinha de cintura média. Conforto da primeira onda ao pôr do sol.' },
    { id: 'biq-asa-delta', n: 'Biquíni Asa Delta Canelado', col: 'Coleção Maré', cat: 'Biquínis', pr: 339, img: 'images/modelo1-b.jpg', tags: 'asa delta canelado biquini', badge: ['pl', 'Exclusivo'], colors: [['Azul Maré', '#7da4b8'], ['Areia', '#e8d9c4']], d: 'Calcinha asa delta de cavada alta em tecido canelado premium. Alonga as pernas e marca a cintura com elegância.' },
    { id: 'biq-hot-pants', n: 'Biquíni Hot Pants Cintura Alta', col: 'Coleção Onda Quente', cat: 'Biquínis', pr: 359, img: 'images/loira2-c.jpg', tags: 'hot pants cintura alta biquini', colors: [['Azul Céu', '#8fb3c9'], ['Preto', '#1e1a16']], d: 'Cintura alta com compressão leve que modela e dá segurança. A queridinha de quem quer conforto sem perder o estilo.' },
    { id: 'biq-cropped', n: 'Biquíni Cropped Com Mangas', col: 'Coleção Garopaba', cat: 'Biquínis', pr: 389, img: 'images/espanhola-b.jpg', tags: 'cropped mangas conjunto biquini', colors: [['Terracota', '#c4693a'], ['Areia', '#e8d9c4']], d: 'Conjunto cropped com mangas e proteção UV50+ — perfeito para esportes na água e dias longos de praia.' },
    { id: 'maio-drapeado', n: 'Maiô Drapeado Frente Única', col: 'Coleção Onda Quente', cat: 'Maiôs', pr: 469, img: 'images/produto-1.jpg', tags: 'maio drapeado frente unica body', badge: ['pl', 'Ed. Limitada'], colors: [['Preto Estampado', '#1e1a16'], ['Terracota', '#c4693a']], d: 'Drapeado frontal que esculpe a silhueta, decote frente única e costas abertas em X. Peça de edição limitada.' },
    { id: 'maio-decote-v', n: 'Maiô Decote V Profundo', col: 'Coleção Maré', cat: 'Maiôs', pr: 429, img: 'images/modelo1-e.jpg', tags: 'maio decote v profundo body', colors: [['Azul Maré', '#7da4b8'], ['Preto', '#1e1a16']], d: 'Decote V profundo com tule de sustentação invisível. Elegância para usar da piscina ao jantar, com saia ou calça.' },
    { id: 'maio-ombro-so', n: 'Maiô Assimetria Ombro Só', col: 'Coleção Garopaba', cat: 'Maiôs', pr: 449, img: 'images/modelo2-e.jpg', tags: 'maio assimetrico ombro so body', badge: ['pn', 'Novo'], colors: [['Terracota', '#c4693a'], ['Bege', '#c9b394']], d: 'Assimetria de um ombro só com recorte lateral. Modelagem escultural que veste como uma segunda pele.' },
    { id: 'maio-costas', n: 'Maiô Costas Nuas Clássico', col: 'Coleção Sol Real', cat: 'Maiôs', pr: 459, img: 'images/loira1-e.jpg', tags: 'maio costas nuas classico body', colors: [['Azul Céu', '#8fb3c9'], ['Preto', '#1e1a16']], d: 'Clássico atemporal com costas totalmente nuas e alças finas ajustáveis. O maiô que nunca sai de moda.' },
    { id: 'saida-kimono', n: 'Kimono Voal Premium', col: 'Coleção Garopaba', cat: 'Saídas', pr: 299, old: 389, img: 'images/loira1-a.jpg', tags: 'kimono voal saida de praia', colors: [['Areia', '#e8d4b8'], ['Terracota', '#c4693a']], d: 'Voal leve com toque de seda, mangas amplas e faixa na cintura. A saída que transforma qualquer biquíni em look completo.' },
    { id: 'saida-saia', n: 'Saia Trançada Linho Leve', col: 'Coleção Maré', cat: 'Saídas', pr: 329, img: 'images/loira2-c.jpg', tags: 'saia trancada linho saida', badge: ['pn', 'Novo'], colors: [['Linho Cru', '#e8d9c4'], ['Areia', '#c9b394']], d: 'Linho leve com cós trançado à mão e fenda frontal. Respira no calor e seca em minutos.' },
    { id: 'saida-chemise', n: 'Chemise Oversized Tricot', col: 'Coleção Litoral', cat: 'Saídas', pr: 399, img: 'images/espanhola-c.jpg', tags: 'chemise oversized tricot saida', colors: [['Areia', '#e8d9c4'], ['Off White', '#faf6f0']], d: 'Tricot vazado oversized que vai da praia ao resort. Use aberta, fechada ou amarrada na cintura.' },
    { id: 'ace-bolsa', n: 'Bolsa Trançada de Palha Natural', col: 'Curadoria Acquamar', cat: 'Acessórios', pr: 229, img: 'images/modelo2-e.jpg', tags: 'bolsa trancada palha acessorio', badge: ['pn', 'Novo'], colors: [['Palha Natural', '#b8a07a']], sizes: ['Único'], d: 'Palha natural trançada à mão por artesãs catarinenses. Forro interno em algodão e espaço para canga, protetor e livro.' },
    { id: 'ace-oculos', n: 'Óculos Acetato Tartaruga', col: 'Curadoria Acquamar', cat: 'Acessórios', pr: 279, img: 'images/espanhola-a.jpg', tags: 'oculos acetato tartaruga sol acessorio', colors: [['Tartaruga', '#6b5442'], ['Preto', '#1e1a16']], sizes: ['Único'], d: 'Acetato italiano com lentes polarizadas UV400. Design atemporal que combina com todos os formatos de rosto.' },
    { id: 'ace-canga', n: 'Canga de Algodão Listras Areia', col: 'Estampa Exclusiva', cat: 'Acessórios', pr: 159, img: 'images/loira2-e.jpg', tags: 'canga algodao listras acessorio', colors: [['Areia', '#e8d9c4'], ['Terracota', '#c4693a']], sizes: ['Único'], d: 'Algodão 100% com estampa exclusiva Acquamar e franjas feitas à mão. 1,60m × 1,10m de puro verão.' }
  ];

  /* ── Utilidades ── */
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return [].slice.call((c || document).querySelectorAll(s)); }
  function norm(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function brl(v) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
  function store(k, v) {
    try {
      if (v === undefined) { var r = localStorage.getItem(k); return r ? JSON.parse(r) : null; }
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) { return null; }
  }
  function byId(id) { return CATALOG.find(function (p) { return p.id === id; }); }
  function byName(name) {
    var n = norm(name).trim();
    return CATALOG.find(function (p) { return norm(p.n) === n; });
  }
  function sizesOf(p) { return p.sizes || ['P', 'M', 'G', 'GG']; }

  var cart = store('acqua_cart') || [];
  var wish = store('acqua_wish') || [];
  var coupon = store('acqua_coupon') || null;

  /* ── Estrutura injetada ── */
  var root = document.createElement('div');
  root.innerHTML =
    '<div class="acq-bk" id="acqBk"></div>' +

    '<aside class="acq-dw" id="acqCart" aria-label="Sacola">' +
    '  <div class="acq-dw-h"><div class="acq-dw-t">Sua sacola<small id="acqCartCount"></small></div><button class="acq-x" data-close>&times;</button></div>' +
    '  <div class="acq-dw-b" id="acqCartBody"></div>' +
    '  <div class="acq-dw-f" id="acqCartFoot"></div>' +
    '</aside>' +

    '<aside class="acq-dw" id="acqWish" aria-label="Favoritos">' +
    '  <div class="acq-dw-h"><div class="acq-dw-t">Favoritos<small id="acqWishCount"></small></div><button class="acq-x" data-close>&times;</button></div>' +
    '  <div class="acq-dw-b" id="acqWishBody"></div>' +
    '</aside>' +

    '<div class="acq-se" id="acqSe" role="dialog" aria-label="Buscar">' +
    '  <div class="acq-se-in">' +
    '    <div class="acq-se-top">' +
    '      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>' +
    '      <input id="acqSeIn" type="text" placeholder="O que você procura?" autocomplete="off"/>' +
    '      <button class="acq-x" data-close>&times;</button>' +
    '    </div>' +
    '    <div class="acq-chips" id="acqChips"></div>' +
    '    <div class="acq-se-res" id="acqSeRes"></div>' +
    '  </div>' +
    '</div>' +

    '<div class="acq-md" id="acqPm" role="dialog"><div class="acq-md-c" id="acqPmC"></div></div>' +
    '<div class="acq-md" id="acqInfo" role="dialog"><div class="acq-md-c solo" id="acqInfoC"></div></div>' +
    '<div class="acq-toast" id="acqToast"></div>';
  document.body.appendChild(root);

  var bk = $('#acqBk');
  var openEl = null;

  function openLayer(el) {
    closeLayer();
    openEl = el;
    el.classList.add('open');
    bk.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (el.id === 'acqSe') setTimeout(function () { $('#acqSeIn').focus(); }, 80);
  }
  function closeLayer() {
    if (!openEl) return;
    openEl.classList.remove('open');
    bk.classList.remove('open');
    document.body.style.overflow = '';
    openEl = null;
  }
  bk.addEventListener('click', closeLayer);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLayer(); });
  $$('[data-close]', root).forEach(function (b) { b.addEventListener('click', closeLayer); });
  [$('#acqPm'), $('#acqInfo')].forEach(function (m) {
    m.addEventListener('click', function (e) { if (e.target === m) closeLayer(); });
  });

  var toastTimer;
  function toast(html) {
    var t = $('#acqToast');
    t.innerHTML = html;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }

  /* ── Carrinho ── */
  function cartQty() { return cart.reduce(function (s, i) { return s + i.qty; }, 0); }
  function cartSubtotal() {
    return cart.reduce(function (s, i) { var p = byId(i.id); return p ? s + p.pr * i.qty : s; }, 0);
  }
  function saveCart() { store('acqua_cart', cart); renderBadges(); renderCart(); }

  function addToCart(id, size, color, qty) {
    qty = qty || 1;
    var hit = cart.find(function (i) { return i.id === id && i.size === size && i.color === color; });
    if (hit) hit.qty += qty;
    else cart.push({ id: id, size: size, color: color, qty: qty });
    saveCart();
    var p = byId(id);
    toast('<b>✓</b> ' + p.n + ' na sacola');
  }

  function renderBadges() {
    var q = cartQty();
    $$('.bdg').forEach(function (b) { b.textContent = q > 0 ? q : ''; });
  }

  function renderCart() {
    var body = $('#acqCartBody'), foot = $('#acqCartFoot');
    $('#acqCartCount').textContent = cartQty() + (cartQty() === 1 ? ' item' : ' itens');
    if (!cart.length) {
      body.innerHTML = '<div class="acq-empty">' +
        '<svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>' +
        '<p>Sua sacola está vazia.</p>' +
        '<button class="acq-mini" data-go="biquinis.html">Explorar a coleção</button></div>';
      foot.innerHTML = '';
      $('[data-go]', body).addEventListener('click', function () { location.href = this.getAttribute('data-go'); });
      return;
    }
    body.innerHTML = cart.map(function (i, ix) {
      var p = byId(i.id); if (!p) return '';
      return '<div class="acq-it">' +
        '<img src="' + p.img + '" alt="' + p.n + '"/>' +
        '<div><div class="acq-it-n">' + p.n + '</div>' +
        '<div class="acq-it-m">' + i.size + (i.color ? ' · ' + i.color : '') + '</div>' +
        '<div class="acq-it-p">' + brl(p.pr * i.qty) + '</div>' +
        '<div class="acq-qty"><button data-d="' + ix + '">−</button><span>' + i.qty + '</span><button data-i="' + ix + '">+</button></div></div>' +
        '<button class="acq-rm" data-r="' + ix + '" aria-label="Remover">×</button></div>';
    }).join('');

    var sub = cartSubtotal();
    var desc = coupon === 'ACQUA10' ? sub * 0.10 : 0;
    var total = sub - desc;
    var falta = FRETE_GRATIS - sub;
    var pct = Math.min(100, sub / FRETE_GRATIS * 100);

    foot.innerHTML =
      '<div class="acq-frete"><p>' + (falta > 0
        ? 'Faltam <strong>' + brl(falta) + '</strong> para o frete grátis'
        : '<strong>Você ganhou frete grátis! 🎉</strong>') +
      '</p><div class="acq-bar"><i style="width:' + pct + '%"></i></div></div>' +
      (coupon
        ? '<p class="acq-cup-ok">Cupom <strong>' + coupon + '</strong> aplicado (−10%) · <a href="#" id="acqCupRm" style="color:inherit">remover</a></p>'
        : '<div class="acq-cup"><input id="acqCupIn" placeholder="Cupom (ex: ACQUA10)"/><button id="acqCupBt">Aplicar</button></div><p class="acq-cup-err" id="acqCupErr" style="display:none">Cupom inválido.</p>') +
      '<div class="acq-tot"><span>Subtotal</span><span>' + brl(sub) + '</span></div>' +
      (desc ? '<div class="acq-tot"><span>Desconto (ACQUA10)</span><span class="desc">−' + brl(desc) + '</span></div>' : '') +
      '<div class="acq-tot"><span>Frete</span><span>' + (sub >= FRETE_GRATIS ? 'Grátis' : 'calculado no checkout') + '</span></div>' +
      '<div class="acq-tot big"><span>Total</span><span>' + brl(total) + '</span></div>' +
      '<a class="acq-btn wa" id="acqCheckout">Finalizar pedido · WhatsApp</a>' +
      '<button class="acq-btn ghost" data-close2>Continuar comprando</button>';

    $$('[data-i]', body).forEach(function (b) { b.addEventListener('click', function () { cart[+b.getAttribute('data-i')].qty++; saveCart(); }); });
    $$('[data-d]', body).forEach(function (b) {
      b.addEventListener('click', function () {
        var i = +b.getAttribute('data-d');
        if (--cart[i].qty <= 0) cart.splice(i, 1);
        saveCart();
      });
    });
    $$('[data-r]', body).forEach(function (b) { b.addEventListener('click', function () { cart.splice(+b.getAttribute('data-r'), 1); saveCart(); }); });

    var cupBt = $('#acqCupBt');
    if (cupBt) cupBt.addEventListener('click', function () {
      var v = norm($('#acqCupIn').value).toUpperCase().trim();
      if (v === 'ACQUA10') { coupon = 'ACQUA10'; store('acqua_coupon', coupon); renderCart(); }
      else $('#acqCupErr').style.display = 'block';
    });
    var cupRm = $('#acqCupRm');
    if (cupRm) cupRm.addEventListener('click', function (e) { e.preventDefault(); coupon = null; store('acqua_coupon', null); renderCart(); });

    $('#acqCheckout').addEventListener('click', function () {
      var lines = cart.map(function (i) {
        var p = byId(i.id);
        return '• ' + i.qty + '× ' + p.n + ' (' + i.size + (i.color ? ', ' + i.color : '') + ') — ' + brl(p.pr * i.qty);
      });
      var msg = 'Olá, Acquamar! Quero finalizar meu pedido:\n\n' + lines.join('\n') +
        '\n\nSubtotal: ' + brl(sub) +
        (desc ? '\nCupom ACQUA10: −' + brl(desc) : '') +
        '\nTotal: ' + brl(total) +
        (sub >= FRETE_GRATIS ? '\nFrete grátis 🎉' : '');
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank');
    });
    $('[data-close2]', foot).addEventListener('click', closeLayer);
  }

  /* ── Favoritos ── */
  function inWish(id) { return wish.indexOf(id) !== -1; }
  function toggleWish(id) {
    var ix = wish.indexOf(id);
    if (ix === -1) { wish.push(id); toast('<b>♥</b> Salvo nos favoritos'); }
    else wish.splice(ix, 1);
    store('acqua_wish', wish);
    syncWishIcons();
    renderWish();
  }
  function syncWishIcons() {
    $$('.pc').forEach(function (card) {
      var p = cardProduct(card), b = $('.wish', card);
      if (p && b) b.classList.toggle('on', inWish(p.id));
    });
  }
  function renderWish() {
    var body = $('#acqWishBody');
    $('#acqWishCount').textContent = wish.length + (wish.length === 1 ? ' peça' : ' peças');
    if (!wish.length) {
      body.innerHTML = '<div class="acq-empty">' +
        '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
        '<p>Você ainda não tem favoritos.</p>' +
        '<button class="acq-mini" data-go="biquinis.html">Explorar a coleção</button></div>';
      $('[data-go]', body).addEventListener('click', function () { location.href = this.getAttribute('data-go'); });
      return;
    }
    body.innerHTML = wish.map(function (id) {
      var p = byId(id); if (!p) return '';
      return '<div class="acq-it"><img src="' + p.img + '" alt="' + p.n + '"/>' +
        '<div><div class="acq-it-n">' + p.n + '</div>' +
        '<div class="acq-it-m">' + p.col + '</div>' +
        '<div class="acq-it-p">' + brl(p.pr) + '</div>' +
        '<button class="acq-mini" data-add="' + id + '" style="margin-top:7px">Adicionar à sacola</button></div>' +
        '<button class="acq-rm" data-w="' + id + '" aria-label="Remover">×</button></div>';
    }).join('');
    $$('[data-add]', body).forEach(function (b) {
      b.addEventListener('click', function () { openProduct(byId(b.getAttribute('data-add'))); });
    });
    $$('[data-w]', body).forEach(function (b) {
      b.addEventListener('click', function () { toggleWish(b.getAttribute('data-w')); });
    });
  }

  /* ── Modal de produto ── */
  var pmSel = { size: null, color: null, qty: 1 };
  function openProduct(p) {
    if (!p) return;
    pmSel = { size: sizesOf(p).length === 1 ? sizesOf(p)[0] : null, color: p.colors[0][0], qty: 1 };
    var c = $('#acqPmC');
    c.innerHTML =
      '<button class="acq-x" data-close>&times;</button>' +
      '<div class="acq-md-img"><img src="' + p.img + '" alt="' + p.n + '"/>' +
      (p.badge ? '<span class="pbdg ' + p.badge[0] + '">' + p.badge[1] + '</span>' : '') + '</div>' +
      '<div class="acq-md-in">' +
      '  <span class="acq-md-col">' + p.col + ' · ' + p.cat + '</span>' +
      '  <h3 class="acq-md-n">' + p.n + '</h3>' +
      '  <p class="acq-md-p">' + (p.old ? '<span class="old">' + brl(p.old) + '</span>' : '') + brl(p.pr) + '</p>' +
      '  <p class="acq-md-d">' + p.d + '</p>' +
      '  <span class="acq-lbl">Cor: <span id="acqPmCor" style="color:var(--moca)">' + pmSel.color + '</span></span>' +
      '  <div class="dots">' + p.colors.map(function (col, i) {
        var border = col[1] === '#e8d9c4' || col[1] === '#faf6f0' ? ';border:1px solid #c8b99a' : '';
        return '<div class="dot' + (i === 0 ? ' on' : '') + '" data-cor="' + col[0] + '" style="background:' + col[1] + border + '" title="' + col[0] + '"></div>';
      }).join('') + '</div>' +
      '  <span class="acq-lbl">Tamanho</span>' +
      '  <div class="acq-sizes">' + sizesOf(p).map(function (s) {
        return '<button class="acq-sz' + (pmSel.size === s ? ' on' : '') + '" data-sz="' + s + '">' + s + '</button>';
      }).join('') + '</div>' +
      '  <div class="acq-md-row">' +
      '    <div class="acq-qty"><button id="acqPmMinus">−</button><span id="acqPmQty">1</span><button id="acqPmPlus">+</button></div>' +
      '    <button class="acq-btn" id="acqPmAdd" style="margin:0">Adicionar à sacola</button>' +
      '    <button class="acq-md-wish' + (inWish(p.id) ? ' on' : '') + '" id="acqPmWish" aria-label="Favoritar"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>' +
      '  </div>' +
      '  <div class="acq-md-links"><a href="guia-medidas.html">Guia de medidas</a><a href="https://wa.me/' + WA + '?text=' + encodeURIComponent('Olá! Tenho uma dúvida sobre: ' + p.n) + '" target="_blank" rel="noopener">Tirar dúvida no WhatsApp</a></div>' +
      '</div>';

    $('[data-close]', c).addEventListener('click', closeLayer);
    $$('.dot', c).forEach(function (d) {
      d.addEventListener('click', function () {
        $$('.dot', c).forEach(function (x) { x.classList.remove('on'); });
        d.classList.add('on');
        pmSel.color = d.getAttribute('data-cor');
        $('#acqPmCor').textContent = pmSel.color;
      });
    });
    $$('.acq-sz', c).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.acq-sz', c).forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        pmSel.size = b.getAttribute('data-sz');
        $('.acq-sizes', c).classList.remove('err');
      });
    });
    $('#acqPmMinus').addEventListener('click', function () { if (pmSel.qty > 1) $('#acqPmQty').textContent = --pmSel.qty; });
    $('#acqPmPlus').addEventListener('click', function () { $('#acqPmQty').textContent = ++pmSel.qty; });
    $('#acqPmWish').addEventListener('click', function () { toggleWish(p.id); this.classList.toggle('on', inWish(p.id)); });
    $('#acqPmAdd').addEventListener('click', function () {
      if (!pmSel.size) { $('.acq-sizes', c).classList.add('err'); return; }
      addToCart(p.id, pmSel.size, pmSel.color, pmSel.qty);
      openLayer($('#acqCart'));
    });
    openLayer($('#acqPm'));
  }

  /* ── Busca ── */
  var CHIPS = ['Biquíni', 'Maiô', 'Saída', 'Kimono', 'Acessórios', 'Conjunto'];
  $('#acqChips').innerHTML = CHIPS.map(function (c) { return '<button class="acq-chip">' + c + '</button>'; }).join('');
  function searchRender(q) {
    var res = $('#acqSeRes');
    var nq = norm(q).trim();
    var hits = !nq ? CATALOG : CATALOG.filter(function (p) {
      return norm(p.n + ' ' + p.cat + ' ' + p.col + ' ' + p.tags).indexOf(nq) !== -1;
    });
    if (!hits.length) { res.innerHTML = '<p class="acq-se-no">Nada encontrado para “' + q + '”. Tente “biquíni”, “maiô”, “kimono”…</p>'; return; }
    res.innerHTML = hits.map(function (p) {
      return '<button class="acq-se-it" data-p="' + p.id + '"><img src="' + p.img + '" alt="' + p.n + '" loading="lazy"/><i>' + p.cat + '</i><b>' + p.n + '</b><s>' + brl(p.pr) + '</s></button>';
    }).join('');
    $$('[data-p]', res).forEach(function (b) {
      b.addEventListener('click', function () { openProduct(byId(b.getAttribute('data-p'))); });
    });
  }
  $('#acqSeIn').addEventListener('input', function () { searchRender(this.value); });
  $$('.acq-chip').forEach(function (c) {
    c.addEventListener('click', function () { $('#acqSeIn').value = c.textContent; searchRender(c.textContent); });
  });
  searchRender('');

  /* ── Ícones do header ── */
  $$('.ib').forEach(function (a) {
    var label = a.getAttribute('aria-label');
    if (!label) return;
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (label === 'Buscar') openLayer($('#acqSe'));
      else if (label === 'Favoritos') openLayer($('#acqWish'));
      else if (label === 'Sacola') openLayer($('#acqCart'));
    });
  });

  /* ── Cards de produto nas páginas ── */
  function cardProduct(card) {
    var nm = $('.pc-nm', card);
    return nm ? byName(nm.textContent) : null;
  }
  $$('.pc').forEach(function (card) {
    var p = cardProduct(card);
    if (!p) return;
    card.dataset.acqId = p.id;
    ['.pc-img .ph', '.pc-nm', '.pc-col', '.pc-pr'].forEach(function (sel) {
      var el = $(sel, card);
      if (el) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', function (e) {
          if (e.target.closest('.wish') || e.target.closest('.qadd')) return;
          openProduct(p);
        });
      }
    });
    var qadd = $('.qadd', card);
    if (qadd) qadd.addEventListener('click', function (e) { e.stopPropagation(); openProduct(p); });
    var w = $('.wish', card);
    if (w) w.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleWish(p.id);
      w.classList.toggle('on', inWish(p.id)); // corrige o toggle visual do script base
    });
    // dots do card selecionam cor e abrem o modal já configurado
    $$('.dot', card).forEach(function (d) {
      d.addEventListener('click', function () {
        $$('.dot', card).forEach(function (x) { x.classList.remove('on'); });
        d.classList.add('on');
      });
    });
  });

  /* ── Filtros (.fb) — funcionam na home e nas categorias ── */
  $$('.fb').forEach(function (b) {
    b.addEventListener('click', function () {
      var q = norm(b.textContent).trim().replace(/s$/, ''); // "biquínis" → "biquini"
      $$('.pc').forEach(function (card) {
        var p = cardProduct(card);
        var show = q === 'todo' || !p ||
          norm(p.n + ' ' + p.cat + ' ' + p.tags).indexOf(q) !== -1;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ── Modais informativos / links mortos do rodapé ── */
  var INFO = {
    trocas: ['Trocas e devoluções', 'Política Acquamar',
      '<p><strong>Primeira troca grátis.</strong> Você tem até <strong>30 dias corridos</strong> após o recebimento para solicitar troca ou devolução de qualquer peça sem uso, com etiqueta e lacre higiênico intactos.</p>' +
      '<p>O reembolso é feito no mesmo método de pagamento em até 7 dias úteis após o recebimento da peça em nosso ateliê.</p>' +
      '<p>Para iniciar, fale com a gente no WhatsApp com o número do pedido.</p>' +
      '<a class="acq-btn wa" href="https://wa.me/' + WA + '?text=' + encodeURIComponent('Olá! Quero solicitar uma troca/devolução.') + '" target="_blank" rel="noopener">Solicitar pelo WhatsApp</a>'],
    rastreio: ['Rastrear pedido', 'Acompanhe sua entrega',
      '<p>Informe o número do seu pedido (enviado por e-mail e WhatsApp na confirmação) e nossa equipe retorna com o status da entrega.</p>' +
      '<div class="acq-track"><input id="acqTrackIn" placeholder="Nº do pedido · ex: ACQ-1234"/><button id="acqTrackBt">Rastrear</button></div>'],
    faq: ['Perguntas frequentes', 'FAQ Acquamar',
      '<details><summary>Qual o prazo de entrega?</summary><p>Sul e Sudeste: 2 a 5 dias úteis. Demais regiões: 4 a 9 dias úteis. Pedidos até 13h saem no mesmo dia.</p></details>' +
      '<details><summary>O biquíni tem proteção UV?</summary><p>Sim! Todo o tecido Acquamar tem proteção UV50+ e resistência a sal, cloro e protetor solar.</p></details>' +
      '<details><summary>Como escolher meu tamanho?</summary><p>Use nosso <a href="guia-medidas.html">guia de medidas</a> — modelagem pensada no corpo real brasileiro. Na dúvida entre dois tamanhos, fique com o maior.</p></details>' +
      '<details><summary>Posso parcelar?</summary><p>Sim, em até 6× sem juros em todos os cartões. No Pix você ganha 5% de desconto adicional.</p></details>' +
      '<details><summary>Vocês têm loja física?</summary><p>Sim — nosso ateliê fica em Garopaba · SC. Venha nos visitar!</p></details>'],
    priv: ['Política de privacidade', 'Seus dados, protegidos',
      '<p>A Acquamar coleta apenas os dados necessários para processar pedidos e melhorar sua experiência: nome, contato, endereço de entrega e histórico de compras.</p>' +
      '<p>Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing. Cookies são usados para manter sua sacola e preferências.</p>' +
      '<p>Você pode solicitar a exclusão dos seus dados a qualquer momento pelo nosso WhatsApp, conforme a LGPD (Lei 13.709/2018).</p>'],
    termos: ['Termos de uso', 'Condições gerais',
      '<p>Ao comprar na Acquamar você concorda com nossas condições: preços e estoque sujeitos a confirmação, prazo de entrega contado a partir da aprovação do pagamento e troca conforme nossa política de 30 dias.</p>' +
      '<p>Todo o conteúdo deste site (fotos, textos e marca) é propriedade da Acquamar Moda Praia e não pode ser reproduzido sem autorização.</p>'],
    loja: ['Nossa loja', 'Garopaba · SC',
      '<p><strong>Ateliê Acquamar</strong><br/>Centro de Garopaba, Santa Catarina.<br/>Seg a sáb · 9h às 19h</p>' +
      '<p>Venha provar a coleção de pertinho, com atendimento de quem entende de praia.</p>' +
      '<a class="acq-btn" href="https://www.google.com/maps/search/Garopaba+SC" target="_blank" rel="noopener">Ver no mapa</a>'],
    trabalhe: ['Trabalhe conosco', 'Vem somar com a gente',
      '<p>Costureiras, artesãs, modelos e apaixonados por moda praia: a Acquamar está sempre de portas abertas para talentos do litoral catarinense.</p>' +
      '<a class="acq-btn wa" href="https://wa.me/' + WA + '?text=' + encodeURIComponent('Olá! Quero trabalhar com a Acquamar.') + '" target="_blank" rel="noopener">Enviar mensagem</a>']
  };
  function openInfo(key) {
    var d = INFO[key]; if (!d) return;
    var c = $('#acqInfoC');
    c.innerHTML = '<button class="acq-x" data-close>&times;</button>' +
      '<h3>' + d[0] + '</h3><span class="acq-md-col">' + d[1] + '</span>' +
      '<div class="acq-info-bd">' + d[2] + '</div>';
    $('[data-close]', c).addEventListener('click', closeLayer);
    var tb = $('#acqTrackBt', c);
    if (tb) tb.addEventListener('click', function () {
      var v = $('#acqTrackIn').value.trim() || 'não informado';
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent('Olá! Quero rastrear meu pedido: ' + v), '_blank');
    });
    openLayer($('#acqInfo'));
  }

  var LINKMAP = [
    ['trocas e devolu', 'trocas'], ['rastrear pedido', 'rastreio'], ['faq', 'faq'],
    ['politica de privacidade', 'priv'], ['termos de uso', 'termos'],
    ['loja', 'loja'], ['trabalhe conosco', 'trabalhe']
  ];
  $$('footer a[href="#"], .ck-p a[href="#"]').forEach(function (a) {
    var t = norm(a.textContent);
    var hit = LINKMAP.find(function (m) { return t.indexOf(m[0]) !== -1; });
    if (hit) {
      a.addEventListener('click', function (e) { e.preventDefault(); openInfo(hit[1]); });
      return;
    }
    // sociais do rodapé sem texto → Instagram
    if (!a.textContent.trim()) { a.href = IG; a.target = '_blank'; a.rel = 'noopener'; }
  });
  $$('.soc a[href="#"], .drawer-social a[href="#"]').forEach(function (a) {
    a.href = IG; a.target = '_blank'; a.rel = 'noopener';
  });

  /* ── Instagram (mosaico + CTA) ── */
  $$('.ig').forEach(function (tile) {
    tile.addEventListener('click', function () { window.open(IG, '_blank'); });
  });
  $$('.ig-cta a[href="#"]').forEach(function (a) { a.href = IG; a.target = '_blank'; a.rel = 'noopener'; });

  /* ── Cookie: persistir escolha + dismissar de fato ──
     O CSS aplica `animation: ckup forwards`, cujo fill-mode sobrepõe
     qualquer transform inline — por isso o banner não sumia ao clicar.
     Precisamos zerar a animação antes de deslizar o banner pra fora. */
  var ckBox = document.getElementById('ck');
  if (ckBox) {
    if (store('acqua_ck')) { ckBox.style.animation = 'none'; ckBox.style.display = 'none'; }
    var dismissCk = function (val) {
      store('acqua_ck', val);
      ckBox.style.animation = 'none';
      ckBox.style.transition = 'transform .45s cubic-bezier(.22,1,.36,1)';
      ckBox.style.transform = 'translateY(100%)';
      setTimeout(function () { ckBox.style.display = 'none'; }, 480);
    };
    var ckOk = document.getElementById('ckok');
    var ckNo = document.getElementById('ckno');
    if (ckOk) ckOk.addEventListener('click', function () { dismissCk('all'); });
    if (ckNo) ckNo.addEventListener('click', function () { dismissCk('essential'); });
  }

  /* ── Newsletter: persistir + feedback (mantém handler original) ── */
  var nlb = document.getElementById('nlb');
  if (nlb) nlb.addEventListener('click', function () {
    var inp = nlb.previousElementSibling;
    if (inp && inp.value && inp.value.indexOf('@') !== -1) store('acqua_nl', inp.value);
  });

  /* ── Cursor custom acompanha os elementos injetados ── */
  var cur = document.getElementById('cur');
  if (cur) {
    root.addEventListener('mouseover', function (e) {
      if (e.target.closest('a,button,.dot,.acq-se-it,.ig')) cur.classList.add('big');
      else cur.classList.remove('big');
    });
    root.addEventListener('mouseleave', function () { cur.classList.remove('big'); });
  }

  /* Inicialização */
  renderBadges();
  renderCart();
  renderWish();
  syncWishIcons();
})();

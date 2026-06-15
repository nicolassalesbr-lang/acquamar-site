/* ── Acquamar Store · motor e-commerce ──────────────────────
   Carrinho, favoritos, busca, modal de produto e checkout WhatsApp.
   Estado persistido em localStorage. */
(function () {
  'use strict';
  var WA = '5548000000000';
  var IG = 'https://www.instagram.com/';
  var FRETE_GRATIS = 399;

  /* ── Catálogo ──────────────────────────────────────────────
     Dados reais extraídos das fichas técnicas (nome, REF, cores,
     tamanhos). Imagens: fotos das modelos, recortadas e tratadas p/ a loja. */
  var CATALOG = [
    // ── BIQUÍNIS ──
    { id: 'biq-millis-bandeau', n: 'Biquíni Millis Power Bandeau', col: 'Coleção Millis Power', cat: 'Biquínis', ref: '030 001 190 0084', pr: 329, img: 'images/prod-b1.jpg?v=5', tags: 'millis power bandeau estampado floral biquini', badge: ['pn', 'Novo'], sizes: ['P', 'M', 'G', 'GG'], colors: [['Penca', '#c2603a'], ['Mimosa Turquesa', '#3aa898'], ['Angra', '#5a7a9a']], d: 'Top bandeau na exclusiva estampa Millis Power, com bojo removível e elástico forrado. Tecido de alta sustentação, secagem rápida e proteção UV50+.' },
    { id: 'biq-millis-cortininha', n: 'Biquíni Millis Power Cortininha', col: 'Coleção Millis Power', cat: 'Biquínis', ref: '030 001 190 0077', pr: 339, img: 'images/prod-b2.jpg?v=5', tags: 'millis power cortininha estampado floral biquini', sizes: ['P', 'M', 'G', 'GG'], colors: [['Angra', '#9a5a4a'], ['Maraú', '#2a3a52'], ['Taípe', '#4a6a88']], d: 'Cortininha de amarração ajustável com aviamento dourado nas alças. Estampa Millis Power assinada pela Acquamar, com forro duplo e ótima cobertura.' },
    { id: 'biq-cali-cortininha', n: 'Biquíni Cali Cortininha', col: 'Coleção Cali', cat: 'Biquínis', ref: '030 001 198 0005', pr: 299, img: 'images/prod-b3.jpg?v=5', tags: 'cali cortininha liso vibrante neon biquini', badge: ['pn', 'Novo'], sizes: ['P', 'M', 'G', 'GG'], colors: [['Verde Limão', '#c4d22a'], ['Violeta', '#7a3357'], ['Líchia', '#c8402f'], ['Preto', '#1e1a16']], colorImgs: { 'Verde Limão': 'images/prod-b3.jpg?v=5', 'Violeta': 'images/prod-b3-violeta.jpg?v=5', 'Líchia': 'images/prod-b3-lichia.jpg?v=5' }, d: 'Cortininha triângulo na linha Cali, em tecido texturizado de cores vibrantes. Amarração no pescoço e nas costas para um caimento sob medida. Escolha a cor para ver a peça.' },
    { id: 'biq-cali-bandeau', n: 'Biquíni Cali Bandeau', col: 'Coleção Cali', cat: 'Biquínis', ref: '030 002 198 0011', pr: 309, img: 'images/prod-b4.jpg?v=5', tags: 'cali bandeau liso vibrante biquini', sizes: ['P', 'M', 'G', 'GG'], colors: [['Verde Tiffany', '#2fb9a6'], ['Líchia', '#d4357a']], colorImgs: { 'Verde Tiffany': 'images/prod-b4.jpg?v=5', 'Líchia': 'images/prod-b4-lichia.jpg?v=5' }, d: 'Bandeau tomara-que-caia com puxador frontal e calcinha de amarração lateral. Textura canelada e cores que são a cara do verão. Escolha a cor para ver a peça.' },
    { id: 'biq-cali-tqc', n: 'Biquíni Cali Cintura Alta', col: 'Coleção Cali', cat: 'Biquínis', ref: '030 002 198 0016', pr: 319, img: 'images/prod-b5.jpg?v=5', tags: 'cali cintura alta hot pants liso vibrante biquini', sizes: ['P', 'M', 'G', 'GG'], colors: [['Violeta', '#7a3357'], ['Líchia', '#c8402f'], ['Preto', '#1e1a16']], colorImgs: { 'Violeta': 'images/prod-b5.jpg?v=5' }, d: 'Calcinha de cintura alta que modela e dá segurança, com top franzido. Textura canelada da linha Cali — conforto e estilo retrô para o verão.' },
    { id: 'biq-lycra-argola', n: 'Biquíni Lycra Argola', col: 'Coleção Lycra', cat: 'Biquínis', ref: '030 002 010 0011', pr: 289, img: 'images/prod-b6.jpg?v=5', tags: 'lycra argola liso preto biquini', sizes: ['P', 'M', 'G', 'GG'], colors: [['Preto', '#1e1a16'], ['Roxo', '#6a2a8a'], ['Azul Dark', '#1a2238'], ['Verde Militar', '#4a5a3a']], d: 'Top com detalhe de argola e calcinha de puxador frontal em lycra encorpada. O básico de luxo que veste como uma segunda pele.' },
    { id: 'biq-lycra-tira', n: 'Biquíni Lycra Tira Fina', col: 'Coleção Lycra', cat: 'Biquínis', ref: '030 002 010 0002', pr: 279, img: 'images/prod-b7.jpg?v=5', tags: 'lycra tira fina borboleta liso biquini', sizes: ['P', 'M', 'G', 'GG'], colors: [['Cru', '#e6dcc8'], ['Cinza', '#b0b0b0'], ['Pistache', '#c4d46a']], d: 'Triângulo de tiras finas com acabamento em viés contrastante e calcinha borboleta. Leveza e bronzeado sem marcas.' },
    // ── MAIÔS ──
    { id: 'maio-lycra-cavado', n: 'Maiô Cavado Decote Halter', col: 'Coleção Praia', cat: 'Maiôs', pr: 449, img: 'images/prod-m1.jpg?v=5', tags: 'maio cavado decote halter costas nuas recorte frente unica body', badge: ['pl', 'Ed. Limitada'], sizes: ['P', 'M', 'G', 'GG'], colors: [['Marrom', '#6b4a2f'], ['Azul Marinho', '#1a2a4a'], ['Preto', '#1e1a16']], d: 'Maiô cavado com decote halter, recortes laterais e costas nuas. Modela a silhueta com elegância atemporal — da piscina ao pôr do sol.' },
    { id: 'maio-millis-decote', n: 'Maiô Millis Power Decote V', col: 'Coleção Millis Power', cat: 'Maiôs', ref: '030 005 190 0054', pr: 469, img: 'images/prod-m2.jpg?v=5', tags: 'maio millis power decote v frente unica estampado body', sizes: ['P', 'M', 'G', 'GG'], colors: [['Oasis', '#3a3a40'], ['Angra', '#5a7a9a'], ['Maraú', '#2a3a52']], d: 'Decote em V transpassado e alças cruzadas nas costas, na estampa exclusiva Millis Power. Sustentação total para curtir da praia ao jantar.' },
    { id: 'maio-carmel-cruzado', n: 'Maiô Carmel Frente Cruzada', col: 'Coleção Carmel', cat: 'Maiôs', ref: '030 005 215 0056', pr: 459, img: 'images/prod-m3.jpg?v=5', tags: 'maio carmel frente cruzada bojo body', badge: ['pn', 'Novo'], sizes: ['P', 'M', 'G', 'GG'], colors: [['Verde Bandeira', '#1f6b4f'], ['Azul Jeans', '#4a6a9a']], d: 'Maiô gola alta com frente cruzada e bojo embutido, em tecido texturizado Carmel. Cobertura generosa e caimento impecável.' },
    // ── VESTIDOS & SAÍDAS ──
    { id: 'vestido-fluxy-midi', n: 'Vestido Fluxy Midi Transpassado c/ Cinto', col: 'Coleção Fluxy', cat: 'Saídas', ref: '030 010 009 0157', pr: 389, img: 'images/prod-v1.jpg?v=5', tags: 'vestido fluxy midi transpassado cinto saida', badge: ['pl', 'Exclusivo'], sizes: ['P', 'M', 'G', 'GG'], colors: [['Oasis', '#b5604a']], d: 'Vestido midi em viscose Fluxy de toque fluido, decote transpassado com argola e cinto que marca a cintura. Da praia ao pôr do sol sem trocar de look.' },
    { id: 'vestido-fluxy-fu', n: 'Vestido Fluxy Frente Única', col: 'Coleção Fluxy', cat: 'Saídas', ref: '030 010 009 0158', pr: 369, img: 'images/prod-v2.jpg?v=5', tags: 'vestido fluxy frente unica longo saida', sizes: ['P', 'M', 'G', 'GG'], colors: [['Azul Marinho', '#1a2a4a'], ['Preto', '#1e1a16'], ['Verde Militar', '#4a5a3a']], d: 'Vestido longo frente única com decote em V e costas nuas. Tecido Fluxy leve e fresco que acompanha o movimento. Elegância descomplicada.' },
    { id: 'saia-pareo', n: 'Saia Pareo Microfibra Longa', col: 'Coleção Praia', cat: 'Saídas', ref: '030 006 003 0054', pr: 259, img: 'images/prod-v3.jpg?v=5', tags: 'saia pareo microfibra longa estampada saida', sizes: ['Único'], colors: [['Penca', '#c2603a']], d: 'Pareô longo com fenda e amarração lateral em microfibra de secagem rápida. A saída de praia mais versátil — vire saia, vestido ou lenço.' },
    { id: 'calca-fluxy-pantalona', n: 'Calça Fluxy Pantalona c/ Bolsos', col: 'Coleção Fluxy', cat: 'Saídas', ref: '030 013 009 0168', pr: 329, img: 'images/prod-v4.jpg?v=5', tags: 'calca fluxy pantalona bolsos saida', badge: ['pn', 'Novo'], sizes: ['P', 'M', 'G', 'GG'], colors: [['Taípe', '#4a6a88'], ['Marrom', '#6b4a2f']], d: 'Pantalona de cintura alta com cordão e bolsos, em viscose Fluxy. O coringa do guarda-roupa de verão — leve sobre o biquíni ou com regata.' },
    // ── ACESSÓRIOS ──
    { id: 'ace-chapeu', n: 'Chapéu de Praia Palha', col: 'Curadoria Acquamar', cat: 'Acessórios', ref: '030 030 017 0023', pr: 189, img: 'images/prod-a1.jpg?v=5', tags: 'chapeu praia palha acessorio', sizes: ['Único'], colors: [['Cru / Natural', '#e0d4bc']], d: 'Chapéu de aba larga em palha trançada com fita preta. Proteção e estilo para os dias de sol — dobrável e fácil de levar na mala.' },
    { id: 'ace-bolsa-boho', n: 'Bolsa Tiracolo Boho', col: 'Curadoria Acquamar', cat: 'Acessórios', ref: '030 025 017 0026', pr: 229, img: 'images/prod-a2.jpg?v=5', tags: 'bolsa tiracolo boho palha redonda acessorio', badge: ['pn', 'Novo'], sizes: ['Único'], colors: [['Camelo', '#c89a5a'], ['Bege', '#d4c2a0']], d: 'Bolsa redonda de palha trançada à mão com alça regulável e fecho de borla. Cabe canga, protetor e o essencial para um dia perfeito de praia.' }
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
      (p.ref ? '  <p style="font-size:10px;letter-spacing:.18em;color:var(--bege);margin:-6px 0 14px">REF: ' + p.ref + '</p>' : '') +
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
        // troca a foto principal para a cor selecionada (se houver imagem)
        var im = p.colorImgs && p.colorImgs[pmSel.color];
        var mi = c.querySelector('.acq-md-img img');
        if (im && mi) mi.src = im;
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

  /* ── Render dinâmico das grades a partir do catálogo ── */
  var WISH_SVG = '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
  function cardHTML(p) {
    var light = { '#f0e8da': 1, '#e6dcc8': 1, '#e0d4bc': 1, '#d4c2a0': 1, '#c4d46a': 1, '#c4d22a': 1 };
    var dots = p.colors.slice(0, 6).map(function (c, i) {
      var border = light[c[1]] ? ';border:1px solid #c8b99a' : '';
      return '<div class="dot' + (i === 0 ? ' on' : '') + '" style="background:' + c[1] + border + '" title="' + c[0] + '"></div>';
    }).join('');
    var price = (p.old ? '<span class="old">' + brl(p.old) + '</span>' : '') + brl(p.pr);
    return '<div class="pc rv2 show" data-acq-id="' + p.id + '">' +
      '<div class="pc-img"><div class="ph"><img src="' + p.img + '" alt="' + p.n + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;z-index:0"></div>' +
      (p.badge ? '<span class="pbdg ' + p.badge[0] + '">' + p.badge[1] + '</span>' : '') +
      '<button class="wish" aria-label="Favoritar">' + WISH_SVG + '</button>' +
      '<button class="qadd">Escolher tamanho</button></div>' +
      '<p class="pc-col">' + p.col + '</p>' +
      '<h3 class="pc-nm">' + p.n + '</h3>' +
      '<p class="pc-pr">' + price + '</p>' +
      '<div class="dots">' + dots + '</div></div>';
  }
  var FEATURED = ['biq-millis-bandeau', 'biq-cali-cortininha', 'maio-carmel-cruzado', 'vestido-fluxy-midi', 'biq-cali-tqc', 'maio-lycra-cavado', 'calca-fluxy-pantalona', 'biq-millis-cortininha'];
  function renderGrids() {
    $$('[data-acq-grid]').forEach(function (grid) {
      var key = grid.getAttribute('data-acq-grid');
      var list = key === 'featured'
        ? FEATURED.map(byId).filter(Boolean)
        : CATALOG.filter(function (p) { return p.cat === key; });
      grid.innerHTML = list.map(cardHTML).join('');
    });
  }
  renderGrids();

  /* ── Cards de produto nas páginas ── */
  function cardProduct(card) {
    if (card.dataset.acqId) return byId(card.dataset.acqId);
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
    // dots do card: selecionam a cor e trocam a foto do card (navegação por cor)
    $$('.dot', card).forEach(function (d) {
      d.addEventListener('click', function (e) {
        e.stopPropagation();
        $$('.dot', card).forEach(function (x) { x.classList.remove('on'); });
        d.classList.add('on');
        var im = p.colorImgs && p.colorImgs[d.getAttribute('title')];
        var ci = $('.pc-img img', card);
        if (im && ci) ci.src = im;
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

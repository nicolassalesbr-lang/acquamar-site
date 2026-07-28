const express = require('express');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const sicoob = require('./payments/sicoob-gateway');
let QRCode = null;
try { QRCode = require('qrcode'); } catch (e) { console.warn('qrcode lib indisponível — PIX sem imagem de QR.'); }

const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || 'acquamar_azure_secret_token_2026';

// Diretório de dados persistente (no Azure = /home/data; local = ./data)
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) { try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) {} }
const ordersPath = process.env.ORDERS_PATH || path.join(DATA_DIR, 'orders.json');

function readOrders() {
    try {
        if (!fs.existsSync(ordersPath)) return [];
        return JSON.parse(fs.readFileSync(ordersPath, 'utf8'));
    } catch (e) { console.error('Erro lendo orders.json:', e); return []; }
}
function writeOrders(orders) {
    try { fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2), 'utf8'); return true; }
    catch (e) { console.error('Erro gravando orders.json:', e); return false; }
}
function findOrder(id) { return readOrders().find(o => o.id === id); }
function upsertOrder(order) {
    const orders = readOrders();
    const idx = orders.findIndex(o => o.id === order.id);
    if (idx === -1) orders.unshift(order); else orders[idx] = order;
    writeOrders(orders);
    return order;
}

app.use(cors());
app.use(express.json());

// Configure Multer for File Uploads
const uploadDir = process.env.IMAGES_UPLOAD_DIR || path.join(__dirname, 'public', 'images', 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'prod-' + uniqueSuffix + ext);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Paths for databases
const catalogPath = process.env.CATALOG_PATH || path.join(__dirname, 'public', 'assets', 'catalog.json');

function readCatalog() {
    try {
        if (!fs.existsSync(catalogPath)) {
            return [];
        }
        const data = fs.readFileSync(catalogPath, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        console.error("Error reading catalog:", e);
        return [];
    }
}

function writeCatalog(catalog) {
    try {
        fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
        return true;
    } catch (e) {
        console.error("Error writing catalog:", e);
        return false;
    }
}

// Authentication Middleware
function requireAuth(req, res, next) {
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
        token = token.substring(7);
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

// LOGIN API
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const adminUser = process.env.ADMIN_USER || 'admin';
    const adminPassHash = process.env.ADMIN_PASS_HASH;
    
    if (username !== adminUser) {
        return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }
    
    let passwordMatches = false;
    if (adminPassHash) {
        passwordMatches = bcrypt.compareSync(password, adminPassHash);
    } else {
        // Fallback for default password if none is configured in .env (for initial setup: "JungTeam@2026")
        passwordMatches = (password === 'JungTeam@2026');
    }
    
    if (!passwordMatches) {
        return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ username: adminUser }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token: token });
});

// GET CATALOG
app.get('/api/products', (req, res) => {
    const catalog = readCatalog();
    res.json(catalog);
});

// ADD PRODUCT
app.post('/api/products', requireAuth, (req, res) => {
    const newProduct = req.body;
    if (!newProduct.id || !newProduct.n || !newProduct.pr) {
        return res.status(400).json({ error: 'Missing required product fields (id, n, pr)' });
    }
    
    const catalog = readCatalog();
    if (catalog.find(p => p.id === newProduct.id)) {
        return res.status(400).json({ error: `Product ID '\${newProduct.id}' already exists.` });
    }
    
    catalog.push(newProduct);
    if (writeCatalog(catalog)) {
        res.status(201).json(newProduct);
    } else {
        res.status(500).json({ error: 'Failed to write catalog.json' });
    }
});

// UPDATE PRODUCT
app.put('/api/products/:id', requireAuth, (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    
    const catalog = readCatalog();
    const idx = catalog.findIndex(p => p.id === productId);
    if (idx === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    // Update matching product properties
    catalog[idx] = { ...catalog[idx], ...updatedProduct };
    
    if (writeCatalog(catalog)) {
        res.json(catalog[idx]);
    } else {
        res.status(500).json({ error: 'Failed to write catalog.json' });
    }
});

// DELETE PRODUCT
app.delete('/api/products/:id', requireAuth, (req, res) => {
    const productId = req.params.id;
    
    const catalog = readCatalog();
    const idx = catalog.findIndex(p => p.id === productId);
    if (idx === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    catalog.splice(idx, 1);
    if (writeCatalog(catalog)) {
        res.json({ success: true, message: `Product \${productId} deleted.` });
    } else {
        res.status(500).json({ error: 'Failed to write catalog.json' });
    }
});

// REORDER PRODUCTS
app.post('/api/products/reorder', requireAuth, (req, res) => {
    const { orderedIds } = req.body;
    if (!orderedIds || !Array.isArray(orderedIds)) {
        return res.status(400).json({ error: 'Invalid payload: orderedIds array is required.' });
    }
    
    const catalog = readCatalog();
    const reorderedCatalog = [];
    
    // Sort catalog based on orderedIds list
    orderedIds.forEach(id => {
        const item = catalog.find(p => p.id === id);
        if (item) {
            reorderedCatalog.push(item);
        }
    });
    
    // Add any remaining items that were not in the ordered list (fail-safe)
    catalog.forEach(item => {
        if (!reorderedCatalog.find(p => p.id === item.id)) {
            reorderedCatalog.push(item);
        }
    });
    
    if (writeCatalog(reorderedCatalog)) {
        res.json({ success: true, message: 'Products reordered successfully.' });
    } else {
        res.status(500).json({ error: 'Failed to save catalog.json' });
    }
});

// UPLOAD IMAGE
app.post('/api/upload', requireAuth, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    
    // Return relative URL of the uploaded image
    const relativePath = 'images/uploads/' + req.file.filename;
    res.json({ url: relativePath });
});

// GET UPLOADED IMAGES GALLERY
app.get('/api/gallery', requireAuth, (req, res) => {
    try {
        if (!fs.existsSync(uploadDir)) {
            return res.json([]);
        }
        const files = fs.readdirSync(uploadDir);
        const images = files.filter(f => /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f))
                             .map(f => 'images/uploads/' + f);
        res.json(images);
    } catch (e) {
        console.error("Error reading gallery:", e);
        res.status(500).json({ error: 'Failed to read gallery' });
    }
});

// DELETE IMAGE FROM GALLERY
app.delete('/api/gallery/:filename', requireAuth, (req, res) => {
    const filename = req.params.filename;
    const targetPath = path.join(uploadDir, filename);
    
    // Check if file exists
    if (!fs.existsSync(targetPath)) {
        return res.status(404).json({ error: 'Arquivo não encontrado' });
    }
    
    // Check if image is in use in catalog.json
    const catalog = readCatalog();
    const relativeUrl = 'images/uploads/' + filename;
    
    const usedProduct = catalog.find(p => {
        if (p.img === relativeUrl) return true;
        if (p.colorImgs) {
            return Object.values(p.colorImgs).includes(relativeUrl);
        }
        return false;
    });
    
    if (usedProduct) {
        return res.status(400).json({ error: `Esta imagem está sendo usada no produto "\${usedProduct.n}" (\${usedProduct.id}) e não pode ser excluída.` });
    }
    
    try {
        fs.unlinkSync(targetPath);
        res.json({ success: true, message: 'Imagem excluída com sucesso' });
    } catch (e) {
        console.error("Error deleting image:", e);
        res.status(500).json({ error: 'Falha ao excluir a imagem do servidor' });
    }
});


/* ═══════════════════════════════════════════════════════════════
   CHECKOUT / PAGAMENTOS (Sicoob)
   ═══════════════════════════════════════════════════════════════ */

const FRETE_GRATIS = 399;
const FRETE_PADRAO = 24.90;   // frete fixo de teste quando abaixo do grátis
const CUPONS = { 'ACQUA10': 0.10 };

// Recalcula os valores no servidor a partir do catálogo (evita adulteração de preço)
function computeAmounts(items, couponCode) {
    const catalog = readCatalog();
    let subtotal = 0;
    const norm = [];
    (items || []).forEach(it => {
        const p = catalog.find(c => c.id === it.id);
        if (!p) return;
        const qty = Math.max(1, parseInt(it.qty, 10) || 1);
        const line = Number(p.pr) * qty;
        subtotal += line;
        norm.push({ id: p.id, n: p.n, pr: Number(p.pr), size: it.size || null, color: it.color || null, qty: qty });
    });
    const code = (couponCode || '').toUpperCase().trim();
    const discount = CUPONS[code] ? +(subtotal * CUPONS[code]).toFixed(2) : 0;
    const shipping = subtotal >= FRETE_GRATIS ? 0 : (subtotal > 0 ? FRETE_PADRAO : 0);
    const total = +(subtotal - discount + shipping).toFixed(2);
    return { items: norm, amounts: { subtotal: +subtotal.toFixed(2), discount, shipping, total }, coupon: CUPONS[code] ? code : null };
}

// Configuração pública do checkout (o front usa p/ exibir o selo de ambiente)
app.get('/api/checkout/config', (req, res) => {
    const cfg = sicoob.config();
    res.json({
        mode: cfg.mode,                       // 'test' | 'production'
        merchantName: cfg.merchantName,
        methods: ['credit', 'debit', 'pix', 'boleto'],
        brands: ['visa', 'mastercard', 'elo', 'amex', 'hipercard'],
        maxInstallments: 6,
        freeShippingFrom: FRETE_GRATIS
    });
});

// Cria o pedido e processa o pagamento
app.post('/api/checkout', async (req, res) => {
    try {
        const { customer, items, coupon, payment } = req.body || {};
        if (!items || !items.length) return res.status(400).json({ error: 'Carrinho vazio.' });
        if (!payment || !payment.method) return res.status(400).json({ error: 'Forma de pagamento não informada.' });
        if (!customer || !customer.name || !customer.email) return res.status(400).json({ error: 'Dados do cliente incompletos.' });

        const calc = computeAmounts(items, coupon);
        if (!calc.items.length) return res.status(400).json({ error: 'Nenhum item válido no carrinho.' });

        const order = {
            id: 'ACQ-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase(),
            createdAt: new Date().toISOString(),
            customer: {
                name: customer.name, email: customer.email, cpf: customer.cpf || '',
                phone: customer.phone || '', cep: customer.cep || '', address: customer.address || '',
                number: customer.number || '', complement: customer.complement || '',
                city: customer.city || '', uf: customer.uf || ''
            },
            items: calc.items,
            coupon: calc.coupon,
            amounts: calc.amounts,
            mode: sicoob.config().mode
        };

        const result = await sicoob.charge(order, {
            method: payment.method,
            card: payment.card,
            installments: payment.installments
        });

        // Gera imagem do QR para PIX (data URL) quando possível
        if (payment.method === 'pix' && result.pixCopiaECola && QRCode) {
            try { result.qrCodeDataUrl = await QRCode.toDataURL(result.pixCopiaECola, { margin: 1, width: 260 }); }
            catch (e) { /* segue sem imagem */ }
        }

        order.payment = {
            method: payment.method,
            status: (result.status === 'approved') ? 'paid' : result.status, // cartão aprovado = pago
            brand: result.brand || null,
            installments: result.installments || 1,
            last4: result.last4 || null,
            txid: result.txid || null,
            authorizationCode: result.authorizationCode || null,
            nsu: result.nsu || null,
            pixCopiaECola: result.pixCopiaECola || null,
            pixKey: result.pixKey || null,
            qrCodeDataUrl: result.qrCodeDataUrl || null,
            boleto: result.boleto || null,
            dueDate: result.dueDate || null,
            expiresAt: result.expiresAt || null,
            message: result.message || ''
        };
        order.status = order.payment.status;

        upsertOrder(order);

        // Não devolvemos dados sensíveis do cartão (nunca foram persistidos)
        res.json({
            orderId: order.id,
            mode: order.mode,
            amounts: order.amounts,
            payment: order.payment
        });
    } catch (e) {
        console.error('Erro no checkout:', e);
        res.status(500).json({ error: 'Falha ao processar o pagamento.' });
    }
});

// Confirma pagamento PIX/Boleto (ambiente de teste). Em produção vem por webhook do Sicoob.
app.post('/api/checkout/:id/confirm', (req, res) => {
    const order = findOrder(req.params.id);
    if (!order) return res.status(404).json({ error: 'Pedido não encontrado.' });
    if (order.status === 'paid') return res.json({ status: 'paid', orderId: order.id });
    const conf = sicoob.confirmTest(order.payment);
    if (conf.status === 'paid') {
        order.status = 'paid';
        order.payment.status = 'paid';
        order.payment.paidAt = conf.paidAt;
        upsertOrder(order);
    }
    res.json({ status: order.status, orderId: order.id, message: conf.message });
});

// Consulta status de um pedido
app.get('/api/checkout/:id/status', (req, res) => {
    const order = findOrder(req.params.id);
    if (!order) return res.status(404).json({ error: 'Pedido não encontrado.' });
    res.json({ orderId: order.id, status: order.status, method: order.payment && order.payment.method });
});

// Lista de pedidos (painel admin)
app.get('/api/orders', requireAuth, (req, res) => {
    res.json(readOrders());
});

// O catálogo público precisa refletir o que o admin edita (CATALOG_PATH → /home/data),
// e não o arquivo estático empacotado na imagem Docker. Sem esta rota, produtos/preços
// alterados no painel não apareciam na loja. Precede o express.static de propósito.
app.get('/assets/catalog.json', (req, res) => {
    res.set('Cache-Control', 'no-store');
    res.json(readCatalog());
});

// As imagens enviadas pelo painel ficam em IMAGES_UPLOAD_DIR (/home/data/uploads no
// VPS/Docker), fora de public/. São referenciadas como /images/uploads/<arquivo>;
// sem esta rota elas caíam no fallback '*' (que devolve index.html) e apareciam
// quebradas na galeria e nos produtos. Precede o express.static de propósito.
app.use('/images/uploads', express.static(uploadDir));

// Serve static assets
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: function (res, filepath) {
        if (filepath.endswith('.html') || filepath.endswith('.js') || filepath.endswith('.css')) {
            res.set('Cache-Control', 'no-cache, must-revalidate');
        }
    }
}));

// Specific fallback for admin routes
app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

// Default fallback for client routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Acquamar Unified Server listening on port \${PORT}`);
    console.log(`Catalog database path: \${catalogPath}`);
    console.log(`Uploads destination: \${uploadDir}`);
});

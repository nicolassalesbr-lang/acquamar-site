# Acquamar — Instruções para Atualização de Imagens (Drive)

Este diretório contém o site público da **Acquamar**. Para substituir os placeholders de demonstração (imagens do Unsplash) pelas fotos oficiais das modelos e produtos do seu Google Drive, siga as instruções abaixo:

---

## 📂 Organização da Pasta de Imagens

Baixe as fotos correspondentes do seu Google Drive (`https://drive.google.com/drive/folders/1mY1QltAd-a6JQFkjEHD0DojDud-yCrT2`), renomeie-as exatamente com os nomes listados abaixo e salve-as na pasta `images/`:

### 👙 Categoria: Biquínis (`biquinis.html` e `index.html`)
* **`biquini-cortininha.jpg`**: Foto do Biquíni Cortininha Com Laço.
* **`biquini-bandeau.jpg`**: Foto do Biquíni Bandeau Argola.
* **`biquini-meia-taca.jpg`**: Foto do Biquíni Meia Taça Retrô.
* **`biquini-asa-delta.jpg`**: Foto do Biquíni Asa Delta Canelado.
* **`biquini-hot-pants.jpg`**: Foto do Biquíni Hot Pants Cintura Alta.
* **`biquini-cropped.jpg`**: Foto do Biquíni Cropped Com Mangas.

### 👗 Categoria: Maiôs (`maios.html`)
* **`maio-drapeado.jpg`**: Foto do Maiô Drapeado Frente Única.
* **`maio-decote-v.jpg`**: Foto do Maiô Decote V Profundo.
* **`maio-ombro-so.jpg`**: Foto do Maiô Assimetria Ombro Só.
* **`maio-costas-nuas.jpg`**: Foto do Maiô Costas Nuas Clássico.

### 👘 Categoria: Saídas de Praia (`saidas.html`)
* **`saida-kimono.jpg`**: Foto do Kimono Voal Premium.
* **`saida-saia-linho.jpg`**: Foto da Saia Trançada Linho Leve.
* **`saida-chemise.jpg`**: Foto da Chemise Oversized Tricot.

### 👜 Categoria: Acessórios (`acessorios.html`)
* **`acessorio-bolsa.jpg`**: Foto da Bolsa Trançada de Palha.
* **`acessorio-oculos.jpg`**: Foto do Óculos Acetato Tartaruga.
* **`acessorio-canga.jpg`**: Foto da Canga de Algodão Listras Areia.

### 🌅 Imagens Institucionais e Lookbook (`index.html` e `historia.html`)
* **`hero-principal.jpg`**: Foto principal do banner do Hero (Home).
* **`historia-manifesto.jpg`**: Foto do manifesto institucional na página de história.
* **`lookbook-1.jpg`** até **`lookbook-5.jpg`**: Fotos conceituais do Lookbook.

---

## 💻 Como Atualizar o Código HTML

Atualmente, o código está utilizando URLs temporárias do Unsplash. Quando você salvar as fotos na pasta `images/`, basta alterar a propriedade `src` das imagens no código HTML para apontar para a pasta local.

**Exemplo no código (de):**
```html
<img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?..." alt="Biquíni Cortininha">
```

**Para (com a sua foto local):**
```html
<img src="images/biquini-cortininha.jpg" alt="Biquíni Cortininha">
```

Se preferir, quando baixar e salvar as fotos na pasta `images/` localmente em sua máquina, me envie os arquivos que eu realizo a alteração de todos os links no código HTML automaticamente para você!

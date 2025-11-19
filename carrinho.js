 // ===========================
//  ADICIONAR AO CARRINHO
// ===========================
function adicionarAoCarrinho(nome, id, preco, imagem) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // verificar se já existe produto com mesmo ID
  let produtoExistente = carrinho.find(item => item.id === id);

  if (produtoExistente) {
    produtoExistente.quantidade = (produtoExistente.quantidade || 1) + 1;
  } else {
    carrinho.push({
      id: id,
      nome: nome,
      preco: preco,
      imagem: imagem,
      quantidade: 1
    });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // só chama renderCarrinho se existir (para não quebrar nas outras páginas)
  if (typeof renderCarrinho === "function") {
    renderCarrinho();
  }

  alert(nome + " foi adicionado ao carrinho!");
}



// ===========================
//  RENDERIZAR CARRINHO
// ===========================
function renderCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  const removerTodosBtn = document.getElementById("removerTodos");
  const resumoCompra = document.getElementById("resumoCompra");
  const finalizarBtn = document.getElementById("finalizar");
  const explorarBtn = document.getElementById("explorar");

  if (!lista) return; // se não está na página do carrinho, sai

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  lista.innerHTML = "";

  // ============================
  //   SE O CARRINHO ESTIVER VAZIO
  // ============================
  if (carrinho.length === 0) {
    lista.innerHTML = "<p>Seu carrinho está vazio.</p>";

    if (removerTodosBtn) removerTodosBtn.style.display = "none";
    if (resumoCompra) resumoCompra.style.display = "none";
    if (finalizarBtn) finalizarBtn.style.display = "none";
    if (explorarBtn) explorarBtn.style.display = "inline-block";

    atualizarTotal();
    return;
  }

  // ============================
  //   CARRINHO COM ITENS
  // ============================
  if (explorarBtn) explorarBtn.style.display = "none";
  if (removerTodosBtn) removerTodosBtn.style.display = "inline-block";
  if (resumoCompra) resumoCompra.style.display = "block";
  if (finalizarBtn) finalizarBtn.style.display = "inline-block";

  carrinho.forEach((item, index) => {
    let div = document.createElement("div");
    div.classList.add("item-carrinho");

    div.innerHTML = `
      <img src="${item.imagem}" class="img-carrinho">
      <div class="carrinho-info">
        <h3>${item.nome}</h3>
        <p>Preço: R$ ${item.preco.toFixed(2)}</p>

        <div class="botoes-quantidade">
          <button class="btn-diminuir" data-index="${index}">-</button>
          <span class="qtd-display">${item.quantidade}</span>
          <button class="btn-aumentar" data-index="${index}">+</button>
          <button class="btn-remover" data-index="${index}">Remover</button>
        </div>
      </div>
    `;

    lista.appendChild(div);
  });

  atualizarTotal();
}



// ===========================
//  ATUALIZAR TOTAL
// ===========================
function atualizarTotal() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let total = carrinho.reduce((s, item) => s + item.preco * item.quantidade, 0);

  const totalElem = document.getElementById("total");
  if (totalElem) {
    totalElem.innerHTML = "Total: R$ " + total.toFixed(2);
  }
}



// ===========================
//  AÇÕES DO CARRINHO (AUMENTAR / DIMINUIR / REMOVER)
// ===========================
document.addEventListener("click", (e) => {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Aumentar quantidade
  if (e.target.classList.contains("btn-aumentar")) {
    const idx = Number(e.target.dataset.index);
    carrinho[idx].quantidade++;
  }

  // Diminuir quantidade
  if (e.target.classList.contains("btn-diminuir")) {
    const idx = Number(e.target.dataset.index);

    if (carrinho[idx].quantidade > 1) {
      carrinho[idx].quantidade--;
    } else {
      carrinho.splice(idx, 1);
    }
  }

  // Remover item completamente
  if (e.target.classList.contains("btn-remover")) {
    const idx = Number(e.target.dataset.index);
    carrinho.splice(idx, 1);
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  if (typeof renderCarrinho === "function") {
    renderCarrinho();
  }
});



// ===========================
//  REMOVER TODOS
// ===========================
const btnRemover = document.getElementById("removerTodos");

if (btnRemover) {
  btnRemover.onclick = () => {
    localStorage.removeItem("carrinho");

    if (typeof renderCarrinho === "function") {
      renderCarrinho();
    }
  };
}



// ===========================
//  FINALIZAR COMPRA
// ===========================
const btnFinalizar = document.getElementById("finalizar");

if (btnFinalizar) {
  btnFinalizar.onclick = () => {
    if (btnFinalizar) {
  btnFinalizar.onclick = () => {
    window.location.href = "https://www.instagram.com/stackd_byma/";   // <<< coloque seu link aqui
  };
}
  };
}



// ===========================
//  BOTÃO "EXPLORAR" (CARRINHO VAZIO)
// ===========================
const explorarBtnGlobal = document.getElementById("explorar");

if (explorarBtnGlobal) {
  explorarBtnGlobal.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}



// ===========================
//  INICIALIZAR QUANDO ABRIR A PÁGINA DO CARRINHO
// ===========================
window.addEventListener("load", () => {
  if (typeof renderCarrinho === "function") {
    renderCarrinho();
    atualizarTotal();
  }
});

document.querySelectorAll('.carousel').forEach(carousel => {
    const slides = carousel.querySelectorAll('.slide');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
    }

    const nextBtn = carousel.querySelector('.next');
    const prevBtn = carousel.querySelector('.prev');

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

    // autoplay de 3s pra cada carrossel
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }, 600);

    showSlide(currentIndex);
});

document.addEventListener('DOMContentLoaded', () => {

    /* --- SEU CÓDIGO DO CARROSSEL AQUI --- */

    // ===== MENU HAMBÚRGUER / MODAL =====
    const menuWrapper = document.querySelector('.menu-wrapper');
    const sandu = document.getElementById('sandu');
    const menuModal = document.getElementById('menu-modal');

    if (sandu && menuModal && menuWrapper) {

        // Abre/fecha no clique no ícone
        sandu.addEventListener('click', (e) => {
            e.preventDefault(); // não navega
            menuModal.classList.toggle('open');
        });

        // Fecha se clicar fora do menu
        document.addEventListener('click', (e) => {
            if (!menuWrapper.contains(e.target)) {
                menuModal.classList.remove('open');
            }
        });
    }

});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('lista-produtos');
    if (!container) return; // página que não tem lista, não faz nada

    const filtro = container.dataset.filtro || 'todos';

    fetch('produtos.json')
        .then(response => response.json())
        .then(data => {
            let produtos = data.produtos || [];

            // se não for "todos", filtra pela categoria
            if (filtro !== 'todos') {
                produtos = produtos.filter(p => p.categoria === filtro);
            }

            if (!produtos.length) {
                container.innerHTML = '<p class="sem-produtos">Nenhum produto encontrado.</p>';
                return;
            }

            produtos.forEach(produto => {
                const card = criarCardProduto(produto);
                container.appendChild(card);
            });
        })
        .catch(err => {
            console.error('Erro ao carregar produtos:', err);
            container.innerHTML = '<p class="sem-produtos">Erro ao carregar produtos.</p>';
        });

function criarCardProduto(produto) {
    const card = document.createElement('div');
    card.className = 'card-produto';

    card.innerHTML = `
        <div class="img-container">
            <img class="img1" src="${produto.imagem1}" alt="${produto.nome}">
            <img class="img2" src="${produto.imagem2}" alt="${produto.nome}">
        </div>

        <h3>${produto.nome}</h3>

        <p class="preco">
            ${produto.preco.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}
        </p>

        <p class="parcelamento">em até 10x sem juros</p>

        <div class="botoes-produto">
            <button class="btn-add"
                onclick="adicionarAoCarrinho('${produto.nome}', ${produto.id}, ${produto.preco}, '${produto.imagem1}')">
                Add to cart
            </button>

            <button class="btn-buy"
                onclick="window.location.href='xxxx'">
                Buy now
            </button>
        </div>
    `;

    return card;
}
});
let colecaoMidia = []

async function carregarCatalogo(){
    const container_card = document.getElementById('catalogo-grid');
    container_card.innerHTML = "<p>Carregando itens, aguarde.</p>";

    try{
const resposta = await fetch('dados.json');
if(!resposta.ok) throw new Error('Erro ao buscar dados');

colecaoMidia= await resposta.json();
renderizarGrid(colecaoMidia);

    }catch(erro){
container_card.innerHTML = `<p style="color:#ef4444;">
Erro ao carregar catálogo: ${erro.message}</p>`;
    }
}

function renderizarGrid(lista){
    const container = document.getElementById('catalogo-grid');
    container.innerHTML = "";

    if(lista.lenght === 0){
        container.innerHTML = `<p class="info">Nenhum item cadastrado nesta categoria</p>`;
        return;
    }
    lista.forEach(item => {
        const card = document.createElement(`div`);
        card.className = 'card';

        card.innerHTML = `
        ${item.capa ?` <img src="${item.capa}"alt="${item.titulo}"class="capa-midia">`:''}
        <div>
        <span class="tag-categoria">${item.categoria}</span>
        <h3>${item.titulo}</h3>
        <p class="info">Plataforma: ${item.plataforma}</p>
        <p class="info">Nota: <span class="nota">${item.nota.toFixed(1)}</span></p>
        <p class="info">Status: <strong>${item.status}</strong></p>
        <div>
        `;
   container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded',carregarCatalogo);
import {
    criarChamado as criarChamadoDom,
    concluirChamado as concluirChamadoRegra,
    excluirChamado as excluirChamadoRegra,
    contarChamados
} from "./chamados.js";

let chamados = [];
let filtroAtual = "Todos";

function criarChamado() {
    const dados = {
        titulo: document.getElementById("titulo").value,
        setor: document.getElementById("setor").value,
        prioridade: document.getElementById("prioridade").value
    };

    try {
        chamados = criarChamadoDom(chamados, dados);
    } catch {
        alert("Preencha todos os campos!");
        return;
    }

    mostrarChamados();
    document.getElementById("titulo").value = "";
    document.getElementById("setor").value = "";
    document.getElementById("prioridade").value = "Baixa";
}

function mostrarChamados() {
    const lista = document.getElementById("listaChamados");
    lista.innerHTML = "";

    for (const chamado of chamados) {
        if (filtroAtual !== "Todos" && chamado.status !== filtroAtual) {
            continue;
        }

        const classe = chamado.status === "Concluído" ? "concluido" : "";
        lista.innerHTML += `
            <div class="chamado ${classe}">
                <h3>#${chamado.id} - ${chamado.titulo}</h3>
                <p><strong>Setor:</strong> ${chamado.setor}</p>
                <p><strong>Prioridade:</strong> ${chamado.prioridade}</p>
                <p><strong>Status:</strong> <span class="status">${chamado.status}</span></p>
                <p><strong>Criado em:</strong> ${chamado.data}</p>
                ${chamado.status === "Aberto"
                    ? `<button onclick="concluirChamado(${chamado.id})">Concluir</button>`
                    : ""}
                <button class="botao-excluir" onclick="excluirChamado(${chamado.id})">Excluir</button>
            </div>
        `;
    }

    atualizarContadores();
}

function concluirChamado(id) {
    chamados = concluirChamadoRegra(chamados, id);
    mostrarChamados();
}

function excluirChamado(id) {
    chamados = excluirChamadoRegra(chamados, id);
    mostrarChamados();
}

function filtrarChamados(filtro) {
    filtroAtual = filtro;
    mostrarChamados();
}

function atualizarContadores() {
    const contadores = contarChamados(chamados);
    document.getElementById("totalChamados").textContent = contadores.total;
    document.getElementById("chamadosAbertos").textContent = contadores.abertos;
    document.getElementById("chamadosConcluidos").textContent = contadores.concluidos;
}

window.criarChamado = criarChamado;
window.concluirChamado = concluirChamado;
window.excluirChamado = excluirChamado;
window.filtrarChamados = filtrarChamados;

mostrarChamados();
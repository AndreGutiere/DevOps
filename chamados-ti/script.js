let chamados = [];

let filtroAtual = "Todos";


function criarChamado() {

    let titulo = document.getElementById("titulo").value;
    let setor = document.getElementById("setor").value;
    let prioridade = document.getElementById("prioridade").value;

    if (titulo == "" || setor == "") {

        alert("Preencha todos os campos!");

        return;
    }


    let chamado = {

        id: chamados.length + 1,

        titulo: titulo,

        setor: setor,

        prioridade: prioridade,

        status: "Aberto",

        data: new Date().toLocaleString("pt-BR")

    };


    chamados.push(chamado);


    mostrarChamados();


    document.getElementById("titulo").value = "";

    document.getElementById("setor").value = "";

    document.getElementById("prioridade").value = "Baixa";
}


function mostrarChamados() {

    let lista = document.getElementById("listaChamados");

    lista.innerHTML = "";


    for (let chamado of chamados) {

        if (
            filtroAtual != "Todos" &&
            chamado.status != filtroAtual
        ) {
            continue;
        }


        let classe = "";

        if (chamado.status == "Concluído") {
            classe = "concluido";
        }


        lista.innerHTML += `

            <div class="chamado ${classe}">

                <h3>
                    #${chamado.id} - ${chamado.titulo}
                </h3>

                <p>
                    <strong>Setor:</strong>
                    ${chamado.setor}
                </p>

                <p>
                    <strong>Prioridade:</strong>
                    ${chamado.prioridade}
                </p>

                <p>
                    <strong>Status:</strong>
                    <span class="status">
                        ${chamado.status}
                    </span>
                </p>

                <p>
                    <strong>Criado em:</strong>
                    ${chamado.data}
                </p>


                ${
                    chamado.status == "Aberto"
                    ?
                    `<button onclick="concluirChamado(${chamado.id})">
                        Concluir
                    </button>`
                    :
                    ""
                }


                <button
                    class="botao-excluir"
                    onclick="excluirChamado(${chamado.id})"
                >
                    Excluir
                </button>

            </div>

        `;
    }


    atualizarContadores();
}


function concluirChamado(id) {

    for (let chamado of chamados) {

        if (chamado.id == id) {

            chamado.status = "Concluído";

        }

    }


    mostrarChamados();
}


function excluirChamado(id) {

    chamados = chamados.filter(function(chamado) {

        return chamado.id != id;

    });


    mostrarChamados();
}


function filtrarChamados(filtro) {

    filtroAtual = filtro;

    mostrarChamados();
}


function atualizarContadores() {

    let total = chamados.length;


    let abertos = chamados.filter(function(chamado) {

        return chamado.status == "Aberto";

    }).length;


    let concluidos = chamados.filter(function(chamado) {

        return chamado.status == "Concluído";

    }).length;


    document.getElementById("totalChamados").textContent = total;

    document.getElementById("chamadosAbertos").textContent = abertos;

    document.getElementById("chamadosConcluidos").textContent = concluidos;
}


mostrarChamados();
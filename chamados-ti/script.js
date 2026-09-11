let chamados = [];

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
        status: "Aberto"
    };

    chamados.push(chamado);

    mostrarChamados();

    document.getElementById("titulo").value = "";
    document.getElementById("setor").value = "";
}


function mostrarChamados() {

    let lista = document.getElementById("listaChamados");

    lista.innerHTML = "";

    for (let chamado of chamados) {

        lista.innerHTML += `
            <div class="chamado">

                <h3>#${chamado.id} - ${chamado.titulo}</h3>

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

            </div>
        `;
    }
}
export function criarChamado(chamados, dados, data = new Date()) {
    if (!dados.titulo || !dados.setor) {
        throw new Error("Título e setor são obrigatórios");
    }

    const proximoId = chamados.length === 0
        ? 1
        : Math.max(...chamados.map(chamado => chamado.id)) + 1;

    return [
        ...chamados,
        {
            id: proximoId,
            titulo: dados.titulo,
            setor: dados.setor,
            prioridade: dados.prioridade,
            status: "Aberto",
            data: data.toLocaleString("pt-BR")
        }
    ];
}

export function concluirChamado(chamados, id) {
    return chamados.map(chamado =>
        chamado.id === id
            ? { ...chamado, status: "Concluído" }
            : chamado
    );
}

export function excluirChamado(chamados, id) {
    return chamados.filter(chamado => chamado.id !== id);
}

export function contarChamados(chamados) {
    return {
        total: chamados.length,
        abertos: chamados.filter(chamado => chamado.status === "Aberto").length,
        concluidos: chamados.filter(chamado => chamado.status === "Concluído").length
    };
}

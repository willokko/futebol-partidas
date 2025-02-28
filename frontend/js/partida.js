document.addEventListener('DOMContentLoaded', () => {
    const partidaId = new URLSearchParams(window.location.search).get('id');
    const partidaDetalhes = document.getElementById('partidaDetalhes');
    const listaJogadores = document.getElementById('listaJogadores');
    const jogadorForm = document.getElementById('jogadorForm');
    const novoJogadorModal = new bootstrap.Modal(document.getElementById('novoJogadorModal'));

    async function carregarPartida() {
        try {
            const response = await fetch(`http://localhost:3000/api/partidas/${partidaId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const partida = await response.json();
            console.log('Dados da partida:', partida);

            // Atualiza o título
            document.getElementById('partidaTitulo').textContent = partida.titulo;
            
            // Atualiza os detalhes
            partidaDetalhes.innerHTML = `
                <h4>Informações</h4>
                <p><strong>Local:</strong> ${partida.local}</p>
                <p><strong>Data:</strong> ${new Date(partida.data).toLocaleDateString()}</p>
                <p><strong>Horário:</strong> ${partida.horario}</p>
            `;

            // Atualiza a lista de jogadores
            listaJogadores.innerHTML = partida.jogadores && partida.jogadores.length 
                ? partida.jogadores.map(jogador => `
                    <div class="d-flex justify-content-between align-items-center mb-2 p-2 border rounded ${jogador.presente ? 'bg-success bg-opacity-10' : ''}">
                        <div>
                            <strong>${jogador.nome}</strong><br>
                            <small>${jogador.telefone}</small>
                        </div>
                        <button class="btn btn-${jogador.presente ? 'success' : 'outline-success'}" 
                                onclick="confirmarPresenca('${jogador.nome}')">
                            ${jogador.presente ? 'Confirmado' : 'Confirmar'}
                        </button>
                    </div>
                `).join('') 
                : '<p class="text-muted">Nenhum jogador cadastrado</p>';

        } catch (error) {
            console.error('Erro ao carregar partida:', error);
            partidaDetalhes.innerHTML = '<div class="alert alert-danger">Erro ao carregar detalhes da partida</div>';
        }
    }

    jogadorForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const jogador = {
            nome: document.getElementById('nomeJogador').value,
            telefone: document.getElementById('telefoneJogador').value
        };

        try {
            const response = await fetch(`http://localhost:3000/api/partidas/${partidaId}/jogadores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jogador)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            jogadorForm.reset();
            novoJogadorModal.hide();
            await carregarPartida();
        } catch (error) {
            console.error('Erro ao adicionar jogador:', error);
            alert('Erro ao adicionar jogador');
        }
    });

    window.confirmarPresenca = async (nomeJogador) => {
        try {
            const response = await fetch(`http://localhost:3000/api/partidas/${partidaId}/jogadores/${nomeJogador}/presenca`, {
                method: 'PUT'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            await carregarPartida();
        } catch (error) {
            console.error('Erro ao confirmar presença:', error);
            alert('Erro ao confirmar presença');
        }
    };

    window.excluirPartida = async () => {
        if (confirm('Tem certeza que deseja excluir esta partida? Esta ação não pode ser desfeita.')) {
            try {
                const response = await fetch(`http://localhost:3000/api/partidas/${partidaId}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                alert('Partida excluída com sucesso!');
                window.location.href = 'index.html'; // Redireciona para a página inicial
            } catch (error) {
                console.error('Erro ao excluir partida:', error);
                alert('Erro ao excluir partida');
            }
        }
    };

    // Carrega os dados da partida quando a página é aberta
    if (partidaId) {
        carregarPartida();
    } else {
        window.location.href = 'index.html';
    }
}); 
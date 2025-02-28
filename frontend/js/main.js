document.addEventListener('DOMContentLoaded', () => {
    const partidaForm = document.getElementById('partidaForm');
    const listaPartidas = document.getElementById('listaPartidas');
    const novaPartidaModal = new bootstrap.Modal(document.getElementById('novaPartidaModal'));

    async function carregarPartidas() {
        try {
            const response = await fetch('http://localhost:3000/api/partidas');
            const data = await response.json();
            
            if (data.partidas.length === 0) {
                listaPartidas.innerHTML = `
                    <div class="col-12">
                        <div class="alert alert-info text-center">
                            Nenhuma partida cadastrada. Clique em "Nova Partida" para começar!
                        </div>
                    </div>`;
                return;
            }

            listaPartidas.innerHTML = data.partidas.map(partida => `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${partida.titulo}</h5>
                            <p class="card-text">
                                <i class="bi bi-calendar"></i> ${new Date(partida.data).toLocaleDateString()}<br>
                                <i class="bi bi-clock"></i> ${partida.horario}<br>
                                <i class="bi bi-geo-alt"></i> ${partida.local}
                            </p>
                            <p class="card-text">
                                <small class="text-muted">
                                    ${partida.jogadores ? partida.jogadores.length : 0} jogadores confirmados
                                </small>
                            </p>
                        </div>
                        <div class="card-footer bg-transparent border-top">
                            <a href="partida.html?id=${partida.id}" class="btn btn-primary w-100">
                                Ver Detalhes
                            </a>
                        </div>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Erro ao carregar partidas:', error);
            listaPartidas.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger">
                        Erro ao carregar partidas. Por favor, tente novamente.
                    </div>
                </div>`;
        }
    }

    partidaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const partida = {
            titulo: document.getElementById('titulo').value,
            local: document.getElementById('local').value,
            data: document.getElementById('data').value,
            horario: document.getElementById('horario').value
        };

        try {
            const response = await fetch('http://localhost:3000/api/partidas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(partida)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            await response.json();
            partidaForm.reset();
            novaPartidaModal.hide();
            await carregarPartidas();
        } catch (error) {
            console.error('Erro ao criar partida:', error);
            alert('Erro ao criar partida');
        }
    });

    carregarPartidas();
});

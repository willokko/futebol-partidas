const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data/partidas.json');

// Função auxiliar para ler o arquivo de dados
async function lerDados() {
    try {
        const data = await fs.readFile(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Se o arquivo não existir, retorna um objeto com array vazio
        if (error.code === 'ENOENT') {
            return { partidas: [] };
        }
        throw error;
    }
}

// Função auxiliar para salvar dados no arquivo
async function salvarDados(dados) {
    await fs.writeFile(dataPath, JSON.stringify(dados, null, 2));
}

const partidasController = {
    // Lista todas as partidas
    async listarPartidas(req, res) {
        try {
            const dados = await lerDados();
            res.json(dados);
        } catch (error) {
            console.error('Erro ao listar partidas:', error);
            res.status(500).json({ error: 'Erro ao listar partidas' });
        }
    },

    // Obtém uma partida específica
    async obterPartida(req, res) {
        try {
            const dados = await lerDados();
            const partida = dados.partidas.find(p => p.id === parseInt(req.params.id));
            
            if (!partida) {
                return res.status(404).json({ error: 'Partida não encontrada' });
            }
            
            res.json(partida);
        } catch (error) {
            console.error('Erro ao obter partida:', error);
            res.status(500).json({ error: 'Erro ao obter partida' });
        }
    },

    // Cria uma nova partida
    async criarPartida(req, res) {
        try {
            const dados = await lerDados();
            const novaPartida = {
                id: Date.now(),
                ...req.body,
                jogadores: []
            };
            
            dados.partidas.push(novaPartida);
            await salvarDados(dados);
            
            res.status(201).json(novaPartida);
        } catch (error) {
            console.error('Erro ao criar partida:', error);
            res.status(500).json({ error: 'Erro ao criar partida' });
        }
    },

    // Adiciona um jogador a uma partida
    async adicionarJogador(req, res) {
        try {
            const dados = await lerDados();
            const partida = dados.partidas.find(p => p.id === parseInt(req.params.id));
            
            if (!partida) {
                return res.status(404).json({ error: 'Partida não encontrada' });
            }

            const novoJogador = {
                nome: req.body.nome,
                telefone: req.body.telefone,
                presente: false
            };

            if (!partida.jogadores) {
                partida.jogadores = [];
            }

            partida.jogadores.push(novoJogador);
            await salvarDados(dados);
            
            res.status(201).json(partida);
        } catch (error) {
            console.error('Erro ao adicionar jogador:', error);
            res.status(500).json({ error: 'Erro ao adicionar jogador' });
        }
    },

    // Confirma a presença de um jogador
    async confirmarPresenca(req, res) {
        try {
            const dados = await lerDados();
            const partida = dados.partidas.find(p => p.id === parseInt(req.params.partidaId));
            
            if (!partida) {
                return res.status(404).json({ error: 'Partida não encontrada' });
            }

            const jogador = partida.jogadores.find(j => j.nome === req.params.jogadorNome);
            if (jogador) {
                jogador.presente = !jogador.presente;
                await salvarDados(dados);
            }

            res.json(partida);
        } catch (error) {
            console.error('Erro ao confirmar presença:', error);
            res.status(500).json({ error: 'Erro ao confirmar presença' });
        }
    },

    // Exclui uma partida
    async excluirPartida(req, res) {
        try {
            const dados = await lerDados();
            dados.partidas = dados.partidas.filter(p => p.id !== parseInt(req.params.id));
            await salvarDados(dados);
            res.json({ message: 'Partida excluída com sucesso' });
        } catch (error) {
            console.error('Erro ao excluir partida:', error);
            res.status(500).json({ error: 'Erro ao excluir partida' });
        }
    }
};

module.exports = partidasController;

const express = require('express');
const cors = require('cors');
const partidasRoutes = require('./routes/partidas');

const app = express();
const PORT = 3000;

// Configuração do CORS
app.use(cors());

// Middleware para processar JSON
app.use(express.json());

// Servir arquivos estáticos do frontend
app.use(express.static('../frontend'));

// Rotas da API
app.use('/api/partidas', partidasRoutes);

// Tratamento de erros básico
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log('Para acessar o sistema, abra http://localhost:3000 no navegador');
});

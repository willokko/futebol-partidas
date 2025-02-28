# ⚽ Organizador de Partidas de Futebol

Um sistema web para organizar partidas de futebol entre amigos, desenvolvido com Node.js, Express e Bootstrap.

## 📋 Funcionalidades

- Criar partidas com título, local, data e horário
- Adicionar jogadores com nome e telefone
- Confirmar presença dos jogadores
- Visualizar todas as partidas cadastradas
- Excluir partidas
- Interface moderna com tema escuro

## 🚀 Tecnologias Utilizadas

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript
  - Bootstrap 5.3
  - Bootstrap Icons

- **Backend:**
  - Node.js
  - Express
  - File System (para persistência de dados)

## 📦 Instalação

1. Clone o repositório
2. Instale as dependências:
``bash
npm install``

4. Inicie o servidor:
``bash
npm start``

6. Acesse a aplicação em seu navegador: `http://localhost:3000`

## 💻 Como Usar

1. Na página inicial, clique em "Nova Partida"
2. Preencha os dados da partida (título, local, data e horário)
3. Na página de detalhes da partida, adicione os jogadores
4. Os jogadores podem confirmar sua presença
5. A partida pode ser excluída se necessário

## 🗂️ Estrutura do Projeto

futebol-partidas/
    ├── backend/
    │   ├── controllers/
    │   │   └── partidasController.js
    │   ├── data/
    │   │   └── partidas.json
    │   ├── routes/
    │   │   └── partidas.js
    │   └── server.js
    ├── frontend/
    │   ├── css/
    │   │   └── styles.css
    │   ├── js/
    │   │   ├── main.js
    │   │   └── partida.js
    │   ├── index.html
    │   └── partida.html
    ├── package.json
    └── README.md

## 👥 Autor

- José Wilson - Desenvolvimento inicial

## 📝 Licença

Este projeto está sob a licença MIT.


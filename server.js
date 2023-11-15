const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Importe as rotas de login
const loginRoutes = require('./loginRoutes');

// Importe as rotas de registro
const registerRoutes = require('./registerRoutes');

// Importe as rotas de atividades
const activitiesRoutes = require('./activitiesRoutes');

// Monte as rotas
app.use('/api/login', loginRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/activities', activitiesRoutes);

app.listen(port, () => {
  console.log(`Servidor Express está ouvindo na porta ${port}`);
});
const express = require('express');
const path = require('path');
const app = express();
const admin = require('firebase-admin');
const serviceAccount = path.resolve(__dirname, 'serviceAccountKey.json');
const port = process.env.PORT || 3000;

console.log('Iniciando o servidor');


// Inicialize o Firebase Admin com as credenciais do seu projeto Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://seu-projeto.firebaseio.com',
});


app.use(express.json());

// Importe as rotas de login
const loginRoutes = require('./routes/loginRoutes');

// Importe as rotas de registro
const registerRoutes = require('./routes/registerRoutes');

// Importe as rotas de atividades
const activitiesRoutes = require('./routes/activitiesRoutes');

// Importe as rotas de deletar atividades
const deleteRoutes = require('./routes/deleteRoutes')

// Importe as rotas de visualizar atividades
const activitiesViewRoutes = require('./routes/activitiesViewRoutes')

// Importe as rotas de editar atividades
const activitiesEditRoutes = require('./routes/activitiesEditRoutes')

// Importe as rotas de resetar senha por email
const resetPasswordRoutes = require('./routes/resetPasswordRoutes')

// Monte as rotas
app.use('/api', loginRoutes);
app.use('/api', registerRoutes);
app.use('/api', activitiesRoutes);
app.use('/api', deleteRoutes);
app.use('/api', activitiesViewRoutes);
app.use('/api', activitiesEditRoutes);
app.use('/api', resetPasswordRoutes);


app.listen(port, () => {
  console.log(`Servidor Express está ouvindo na porta ${port}`);
});
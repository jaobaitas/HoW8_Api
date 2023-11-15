const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Inicialize o Firebase Admin com as credenciais do seu projeto Firebase
admin.initializeApp({
  credential: admin.credential.cert('caminho-para-suas-credenciais.json'),
  databaseURL: 'https://seu-projeto.firebaseio.com',
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Lógica de login aqui
    // Autenticar o usuário com o Firebase Authentication
    const user = await admin.auth().getUserByEmail(email);
    res.json({ message: 'Login bem-sucedido', user: user });
  } catch (error) {
    res.status(401).json({ message: 'Falha na autenticação', error: error.message });
  }
});

module.exports = router;

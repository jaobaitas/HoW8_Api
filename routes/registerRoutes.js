const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Inicialize o Firebase Admin com as credenciais do seu projeto Firebase
admin.initializeApp({
  credential: admin.credential.cert('caminho-para-suas-credenciais.json'),
  databaseURL: 'https://seu-projeto.firebaseio.com',
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Lógica de registro aqui
    // Crie um novo usuário no Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    res.json({ message: 'Registro bem-sucedido', user: userRecord });
  } catch (error) {
    res.status(400).json({ message: 'Falha no registro', error: error.message });
  }
});

module.exports = router;

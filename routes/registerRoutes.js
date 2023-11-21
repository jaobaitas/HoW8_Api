const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

console.log('Entrou no registerRoutes.js');

router.post('/register', async (req, res) => {
  console.log('Rota de registro acessada'); // Verifique se a rota está sendo acessada
  const { email, password } = req.body;
  console.log('Email:', email); // Verifique se os dados da requisição estão chegando corretamente

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

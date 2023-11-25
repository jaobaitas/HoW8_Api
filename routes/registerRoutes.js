const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

console.log('Entrou no registerRoutes.js');

router.post('/register', async (req, res) => {
  console.log('Rota de registro acessada');
  const { email, password, confirmPassword } = req.body;
  console.log('Email:', email);

  // Verificar se as senhas coincidem
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'As senhas não coincidem' });
  }

  try {
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

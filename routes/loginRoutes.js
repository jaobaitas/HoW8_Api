const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

console.log('Entrou no loginRoutes.js');


router.post('/login', async (req, res) => {
  console.log('Rota de login acessada'); // Verifique se a rota está sendo acessada
  const { email, password } = req.body;
  console.log('Email:', email); // Verifique se os dados da requisição estão chegando corretamente

  try {
    // Lógica de login aqui
    // Autenticar o usuário com o Firebase Authentication
    const user = await admin.auth().getUserByEmail(email);
    console.log('Usuário autenticado:', user); // Verifique se a autenticação está ocorrendo corretamente
    res.json({ message: 'Login bem-sucedido', user: user });
  } catch (error) {
    console.error('Erro na autenticação:', error); // Registre qualquer erro que ocorra
    res.status(401).json({ message: 'Falha na autenticação', error: error.message });
  }
});

module.exports = router;

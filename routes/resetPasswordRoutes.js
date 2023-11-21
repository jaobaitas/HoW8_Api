const express = require('express');
const router = express.Router();
const transporter = require('../config/nodemailerConfig'); // Importe o transporter criado

console.log('Entrou no resetPasswordRoutes.js');

router.post('/reset-password', async (req, res) => {
  console.log('Rota de redefinição de senha acessada');
  const { email } = req.body;
  console.log('Email:', email);

  try {
    const resetLink = 'https://www.example.com/reset-password'; // Link genérico para a redefinição de senha

    // Configuração do e-mail
    const mailOptions = {
      from: '', //coloque o email usado no nodemailerConfig
      to: email,
      subject: 'Link para redefinição de senha',
      text: `Clique neste link para redefinir sua senha: ${resetLink}`
    };

    // Envio do e-mail usando Nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Erro ao enviar e-mail:', error);
        res.status(500).json({ message: 'Falha ao enviar o e-mail de redefinição de senha' });
      } else {
        console.log('E-mail enviado:', info.response);
        res.json({ message: 'E-mail de redefinição de senha enviado com sucesso' });
      }
    });
  } catch (error) {
    res.status(400).json({ message: 'Falha ao enviar o e-mail de redefinição de senha', error: error.message });
  }
});

module.exports = router;

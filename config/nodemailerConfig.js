const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '', // Coloque seu e-mail aqui
    pass: '' // Coloque sua senha aqui
  }
});

module.exports = transporter;

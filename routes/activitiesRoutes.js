const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Inicialize o Firebase Admin com as credenciais do seu projeto Firebase
admin.initializeApp({
  credential: admin.credential.cert('caminho-para-suas-credenciais.json'),
  databaseURL: 'https://seu-projeto.firebaseio.com',
});

// Referência ao Firestore
const db = admin.firestore();

router.post('/add', async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({ message: 'Título e descrição são obrigatórios' });
  } else {
    try {
      // Adicione uma nova atividade ao Firestore
      const activityRef = await db.collection('activities').add({
        title: title,
        description: description,
      });

      const newActivity = {
        id: activityRef.id,
        title: title,
        description: description,
      };

      res.json({ message: 'Atividade adicionada com sucesso', activity: newActivity });
    } catch (error) {
      res.status(500).json({ message: 'Falha ao adicionar atividade', error: error.message });
    }
  }
});

module.exports = router;

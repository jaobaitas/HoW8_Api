const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Inicialize o Firebase Admin com as credenciais do seu projeto Firebase
// ...

// Referência ao Firestore
const db = admin.firestore();

// Rota para visualizar todas as atividades
router.get('/activities', async (req, res) => {
  try {
    const snapshot = await db.collection('activities').get();

    const activities = [];
    snapshot.forEach((doc) => {
      activities.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json({ activities });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar atividades', error: error.message });
  }
});

module.exports = router;

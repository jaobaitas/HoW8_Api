const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Referência ao Firestore
const db = admin.firestore();

// Rota para deletar uma atividade
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Deleta a atividade do Firestore usando o ID fornecido
    await db.collection('activities').doc(id).delete();
    res.json({ message: 'Atividade deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Falha ao deletar atividade', error: error.message });
  }
});

module.exports = router;

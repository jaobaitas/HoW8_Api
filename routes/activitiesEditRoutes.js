const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');



console.log('Entrou no EditRoutes.js');

// Referência ao Firestore
const db = admin.firestore();

// Rota para editar uma atividade específica
router.put('/activities/edit/:id', async (req, res) => {
  const { id } = req.params; // Captura o ID da atividade a ser editada
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({ message: 'Título e descrição são obrigatórios' });
  } else {
    try {
      // Verifica se a atividade existe antes de tentar editar
      const activityRef = db.collection('activities').doc(id);
      const doc = await activityRef.get();

      if (!doc.exists) {
        res.status(404).json({ message: 'Atividade não encontrada' });
      } else {
        // Atualiza os dados da atividade no Firestore
        await activityRef.update({ title, description });

        const updatedActivity = {
          id: id,
          title: title,
          description: description,
        };

        res.json({ message: 'Atividade editada com sucesso', activity: updatedActivity });
      }
    } catch (error) {
      res.status(500).json({ message: 'Falha ao editar atividade', error: error.message });
    }
  }
});

module.exports = router;

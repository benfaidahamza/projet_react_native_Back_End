const express = require('express');
const router = express.Router();
const Medicaments = require('../../../models/Medicament');
const {verifyToken } = require('./jwt');

router.get('/', verifyToken, (req, res) => {
    Medicaments.find()
    .then(medicaments => res.json(medicaments))
    .catch(err => res.status(404).json({ nomedicamentsFound: 'Pas de médicaments trouvés...' }));
});

router.get('/:id', verifyToken, (req, res) => {
   Medicaments.findById(req.params.id)
    .then(medicament => res.json(medicament))
    .catch(err => res.status(404).json({ medicamentNotFound: 'médicament non trouvé...' }));
});

router.post('/CreateMedicament', verifyToken, (req, res) => {
  Medicaments.create(req.body)
    .then(medicament=> res.json({ msg: 'médicament bien ajouté !' }))
    .catch(err => res.status(400).json({ error: 'Impossible d\'ajouter le médicament' }));
});

router.get('/nom/:nom', verifyToken, (req, res) => {
  const nom= req.params.nom;
  Medicaments.find({ nom: nom })
    .then(medicament => res.json(medicament))
    .catch(err => res.status(404).json({ medicamentNotFound: 'médicament non trouvé...' }));
});

router.put('/:id', verifyToken, (req, res) => {
    Medicaments.findByIdAndUpdate(req.params.id, req.body)
    .then(medicament => res.json({ msg: 'médicament bien modifié!' }))
    .catch(err => res.status(400).json({ error: 'Erreur lors de la mise à jour du médicament...' }));
});

router.delete('/:id', verifyToken, (req, res) => {
  Medicaments.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: 'Médicament supprimé avec succès' }))
    .catch(err => res.status(404).json({ medicamentNotFound: 'Medicament non trouvé...' }));
});

module.exports = router;

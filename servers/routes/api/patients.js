const express = require('express');
const router = express.Router();
const Patients = require('../../../models/Patient');
const Medicaments = require('../../../models/Medicament');
const {verifyToken } = require('./jwt');

router.get('/', verifyToken, (req, res) => {
  Patients.find()
    .then(patients => res.json(patients))
    .catch(err => res.status(404).json({ nopatientsFound: 'Pas de patients trouvés...' }));
});

router.get('/:id', verifyToken, (req, res) => {
    Patients.findById(req.params.id)
      .then(patient => res.json(patient))
      .catch(err => res.status(404).json({ patientNotFound: 'Patient non trouvé...' }));
  });
  

router.post('/Createpatient', verifyToken, (req, res) => {
  Patients.create(req.body)
    .then(patient => res.json({ msg: 'patient bien ajouté !' }))
    .catch(err => res.status(400).json({ error: 'Impossible d\'ajouter le produit' }));
});

router.get('/email/:email', verifyToken, (req, res) => {
    const email= req.params.email;
    Patients.find({ email: email })
      .then(patient => res.json(patient))
      .catch(err => res.status(404).json({ nopatientsFound: 'Pas de patient trouvé avec cet email...' }));
});

router.get('/nom/:nom', verifyToken, (req, res) => {
  const nom= req.params.nom;
  Patients.find({ nom: nom })
    .then(patient => res.json(patient))
    .catch(err => res.status(404).json({ nopatientsFound: 'Pas de patient trouvé avec ce nom...' }));
});

router.get('/sexe/:sexe', verifyToken, (req, res) => {
    const sexe= req.params.sexe;
    Patients.find({sexe: sexe})
      .then(patient => res.json(patient))
      .catch(err => res.status(404).json({ nopatientsFound: 'Pas de patient trouvé avec cet prénom...' }));
  });

router.get('/prenom/:prenom', verifyToken, (req, res) => {
  const prenom= req.params.prenom;
  Patients.find({prenom: prenom})
    .then(patient => res.json(patient))
    .catch(err => res.status(404).json({ nopatientsFound: 'Pas de patient trouvé avec cet prénom...' }));
});

router.put('/:id', verifyToken, (req, res) => {
  console.log(req.body)
  Patients.findByIdAndUpdate(req.params.id, req.body)
    .then(patient => res.json({ msg: 'Utilisateur bien modifié!' }))
    .catch(err => res.status(400).json({ error: 'Erreur lors de la mise à jour du patient...' }));
});

router.delete('/:id', verifyToken, (req, res) => {
  Patients.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: 'Patient supprimé avec succès' }))
    .catch(err => res.status(404).json({ patientNotFound: 'Patient non trouvé...' }));
});

router.post('/:id/medicaments', async (req, res) => {
    try {
      const userId = req.params.id;
      const { nom, fois_par_jour, duree } = req.body;
      const patient = await Patients.findById(userId);
  
      if (!patient) {
        return res.status(404).json({ message: 'Patient non trouvé...' });
      }
  
      const nouveauMedicament = {
        nom,
        fois_par_jour,
        duree,
      };
      patient.traitements.push(nouveauMedicament);
      const patientMisAJour = await patient.save();
      res.json(patientMisAJour);
    } catch (err) {
      res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout du médicament.', error: err });
    }
  });

module.exports = router;

const express = require('express');
const router = express.Router();
const Appointments = require('../../../models/Appointment');
const {verifyToken } = require('./jwt');

router.get('/', verifyToken, (req, res) => {
    Appointments.find()
    .then(appointments => res.json(appointments))
    .catch(err => res.status(404).json({ noappointmentFound: "Pas d'appointments trouvés..."}));
});

router.get('/:id', verifyToken, (req, res) => {
    console.log(req.params.id)
    Appointments.findById(req.params.id)
    .then(appointment => res.json(appointment))
    .catch(err => res.status(404).json({ appointmentNotFound: 'appointment non trouvé...' }));
});

router.post('/CreateAppointment', verifyToken, (req, res) => {
    Appointments.create(req.body)
    .then(appointment=> res.json({ msg: 'appointment bien ajouté !' }))
    .catch(err => res.status(400).json({ error: 'Impossible d\'ajouter l\'appointment' }));
});

router.get('/idpatient/:patientId', verifyToken, (req, res) => {
  const patientId= req.params.patientId;
  console.log(patientId)
  Appointments.find({ patientId: patientId })
    .then(appointment => res.json(appointment))
    .catch(err => res.status(404).json({ appointmentNotFound: 'appointment non trouvé...' }));
});

router.get('/idmedecin/:idMedecin', verifyToken, (req, res) => {
    const idMedecin = req.params.idMedecin;
    Appointments.find({ medecinId: idMedecin })
      .then(appointments => res.json(appointments))
      .catch(err => res.status(404).json({ appointmentNotFound: 'Aucun rendez-vous trouvé pour ce médecin.' }));
  });

router.put('/:id', verifyToken, (req, res) => {
    Appointments.findByIdAndUpdate(req.params.id, req.body)
    .then(appointment => res.json({ msg: 'appointment bien modifié!' }))
    .catch(err => res.status(400).json({ error: 'Erreur lors de la mise à jour d\'appointment...' }));
});

router.delete('/:id', verifyToken, (req, res) => {
    Appointments.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: 'appointment supprimé avec succès' }))
    .catch(err => res.status(404).json({ appointmentNotFound: 'appointment non trouvé...' }));
});

module.exports = router;

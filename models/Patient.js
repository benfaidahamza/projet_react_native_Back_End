const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  poids: {
    type: Number,
    required: true
  },
  taille: {
    type: Number,
    required: true
  },
  sexe: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
  },
  traitements: [
    {
      nom: {
        type: String,
        required: true
      },
      duree: {
        type: Number,
        required: true
      },
      fois_par_jour: {
        type: Number,
        required: true
      }
    }
  ],
}, { versionKey: false });

module.exports = mongoose.model('Patients', patientSchema, 'Patients');

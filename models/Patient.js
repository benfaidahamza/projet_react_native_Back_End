const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  age: {
    type: Number,
  },
  poids: {
    type: Number,
  },
  taille: {
    type: Number,
  },
  sexe: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  traitements: [
    {
      nom: {
        type: String,
      },
      duree: {
        type: Number,
      },
      fois_par_jour: {
        type: Number,
      }
    }
  ],
}, { versionKey: false });

module.exports = mongoose.model('Patients', patientSchema, 'Patients');

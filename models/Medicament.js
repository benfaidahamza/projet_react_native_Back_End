const mongoose = require('mongoose');

const MedicamentsSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('Medicaments', MedicamentsSchema, 'Medicaments');

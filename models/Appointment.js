const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: String,
    ref: 'User',
    required: true,
  },
  medecinId: {
    type: String,
    ref: 'User',
    required: true,
  },
  date: { 
    type: Date,
    required: true 
  },
  duree: {
     type: Number,
     required: true },

  motif: { 
    type: String, 
    required: true 
  },
}, { versionKey: false });

module.exports= mongoose.model('Appointments', appointmentSchema,'Appointments');


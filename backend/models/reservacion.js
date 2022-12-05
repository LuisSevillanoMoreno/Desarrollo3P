const mongoose = require('mongoose')

const reservacionSchema = mongoose.Schema({
  title: {type: String, required: true}, //Mongoose.com
  solicitante: {type: String, required: true},
  habitaciones: {type: Number, required: true},
  direccion: {type: String, required: true},
  telefonoSol: {type: String, required: true}

});

module.exports = mongoose.model('Reservacion', reservacionSchema);

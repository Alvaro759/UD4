const mongoose = require('mongoose');
const concesionariosSchema = mongoose.Schema({
    nombre:  String,
    direccion: String,
    coches: String
  });;



// Crear el modelo
const concesionarios = mongoose.model('Concesionarios', concesionariosSchema);

module.exports = concesionarios;
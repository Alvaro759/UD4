const mongoose = require("mongoose");
const concesionariosSchema = mongoose.Schema({
  nombre: String,
  direccion: String,
  coches: [
    {
      marca: String,
      modelo: String,
    },
  ],
});

// Crear el modelo
const concesionarios = mongoose.model("Concesionarios", concesionariosSchema);

module.exports = concesionarios;

/**
 * Tres formsa ed almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante no se puede modificar
 */

// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const express = require("express");

// Inicializamos la aplicación
const app = express();

//  Indicamos que la aplicación puede escribir JSON (API Rest)
app.use(express.json());

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Arrancamos la aplicación
app.listen(port, () => {
  console.log(`Servidor desplegando en puerto: ${port}`);
});

// Definimos una estructura de datos
// (temporal hasta incorporar una base de datos)
let concesionario = [
  {
    nombre: "Bahiamocion",
    direccion: "C/ FOntaneros Nº4",
    coches: "Seat Leon, Cupra Formentor, Seat Arona, AUDI A6 50 TDI",
  },
  {
    nombre: "Puerto Motor",
    direccion: "Calle Estuario 14 Poligono Industrial Las Salinas",
    coches: "BMW Serie 4 M4 Cabrio, Chevrolet Corvette C7, LAMBORGHINI Huracán",
  },
];

// Lista todos los concesionario
app.get("/concesionario", (request, response) => {
  response.json(concesionario);
});

// Añadir un nuevo coche
app.post("/concesionario", (request, response) => {
  concesionario.push(request.body);
  response.json({ message: "ok" });
});

// Obtener un solo coche
app.get("/concesionario/:id", (request, response) => {
  const id = request.params.id;
  const result = concesionario[id];
  response.json({ result });
});

// Actualizar un solo coche
app.put("/concesionario/:id", (request, response) => {
  const id = request.params.id;
  concesionario[id] = request.body;
  response.json({ message: "ok" });
});

// Borrar un elemento del array
app.delete("/concesionario/:id", (request, response) => {
  const id = request.params.id;
  concesionario = concesionario.filter((item) => concesionario.indexOf(item) !== id);

  response.json({ message: "ok" });
});

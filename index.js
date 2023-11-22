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
let concesionarios = [
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

// Lista todos los concesionarios
app.get("/concesionarios", (request, response) => {
  response.json(concesionarios);
});

// Añadir un nuevo concesionarios
app.post("/concesionarios", (request, response) => {
  concesionarios.push(request.body);
  response.json({ message: "ok" });
});

// Obtener un solo concesionarios
app.get("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  const result = concesionarios[id];
  response.json({ result });
});

// Actualizar un solo concesionarios
app.put("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  concesionarios[id] = request.body;
  response.json({ message: "ok" });
});

// Borrar un elemento del array
app.delete("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  concesionarios = concesionarios.filter((item, index) => index != id);
  response.json({ message: "ok" });
});

// Obtener todos los coches de un concesionarios por id
app.get("/concesionarios/:id/coches", (request, response) => {
  const id = request.params.id;
  const concesionarioConcreto = concesionarios[id];

  const result = concesionarioConcreto.coches.split(",").map((coches) => coches.trim());
  response.json({ result });
});

// Añadir un nuevo coche al concesionarios
app.post("/concesionarios/:id/coches", (request, response) => {
  const id = request.params.id;
  const concesionarioConcreto = concesionarios[id];

  concesionarioConcreto.coches += `, ${request.body.coches}`;
  response.json({ message: "ok" });
});

// Obtiene el coche cuyo id sea cocheId, del concesionarios pasado por id
app.get("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const concesionarioConcreto = concesionarios[id];

  const cocheId = request.params.cocheId;
  const coches = concesionarioConcreto.coches.split(",").map((coches) => coches.trim());

  const result = coches[cocheId];

  response.json({ result });
});

// Actualiza el coche cuyo id sea cocheId, del concesionarios pasado por id
app.put("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const concesionarioConcreto = concesionarios[id];

  const cocheId = request.params.cocheId;
  const coches = concesionarioConcreto.coches.split(",").map((coches) => coches.trim());

  coches[cocheId] = request.body.coches;
  concesionarioConcreto.coches = coches.join(", ");

  response.json({ message: "ok" });
});

// Borra el coche cuyo id sea cocheId, del concesionarios pasado por id
app.delete("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const concesionarioConcreto = concesionarios[id];

  const cocheId = request.params.cocheId;
  const coches = concesionarioConcreto.coches.split(",").map((coches) => coches.trim());

  coches.splice(cocheId, 1);
  concesionarioConcreto.coches = coches.join(", ");

  response.json({ message: "ok" });
});

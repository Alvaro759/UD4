// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const express = require("express");
const mongoose = require("mongoose");
const db = require("./db");
const concesionariosSchema = require("./models/concesionarios");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Inicializamos la aplicación
const app = express();

//  Indicamos que la aplicación puede escribir JSON (API Rest)
app.use(express.json());

// Configuración de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Arrancamos la aplicación
app.listen(port, () => {
  console.log(`Servidor desplegando en puerto: ${port}`);
});

db();
// Definimos una estructura de datos
// (temporal hasta incorporar una base de datos)
/*let concesionarios = [
{
    "nombre": "Bahiamocion",
    "direccion": "C/ Fontaneros Nº4",
    "coches": [
        {
            "marca": "Seat",
            "modelo": "Leon"
        },
        {
            "marca": "Cupra",
            "modelo": "Formentor"
        },
        {
            "marca": "Seat",
            "modelo": "Arona"
        },
        {
            "marca": "Audi",
            "modelo": "A6 50 TDI"
        }
    ]
  },
   {
    "nombre": "Puerto Motor",
    "direccion": "Calle Estuario 14 Poligono Industrial Las Salinas",
    "coches": [
      {
        "marca": "BMW",
        "modelo": "Serie M4 Cabrio"
      },
      {
        "marca": "Chevrolet",
        "modelo": "Covertte C7"
      },
      {
        "marca": "Lamborghini",
        "modelo": "Huracán"
      }
    ],
  }
];*/

// Lista todos los concesionarios
app.get("/concesionarios", (request, response) => {
  concesionariosSchema
    .find()
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

// Añadir un nuevo concesionarios
app.post("/concesionarios", (request, response) => {
  const concesionario = concesionariosSchema(request.body);
  concesionario
    .save()
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

// Obtener un solo concesionarios
app.get("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  concesionariosSchema
    .findById(id)
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

// Actualizar un solo concesionarios
app.put("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  const { nombre, direccion, coches } = request.body;
  concesionariosSchema
    .updateOne({ _id: id }, { $set: { nombre, direccion, coches } })
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

// Borrar un elemento del array
app.delete("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  concesionariosSchema
    .deleteOne({ _id: id })
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

// Obtener todos los coches de un concesionarios por id
app.get("/concesionarios/:id/coches", (request, response) => {
  const id = request.params.id;

  concesionariosSchema
    .findById(id)
    .then((concesionario) => {
      response.json({ coches: concesionario.coches });
    })
    .catch((error) => response.json({ message: error }));
});

// Añadir un nuevo coche al concesionario
app.post("/concesionarios/:id/coches", (request, response) => {
  const id = request.params.id;
  const { marca, modelo } = request.body;

  concesionariosSchema
    .findById(id)
    .then((concesionario) => {
      if (!concesionario) {
        return response.status(404).json({ message: "Concesionario no encontrado" });
      }

      // Agregar el nuevo coche al array existente
      const nuevoCoche = { marca, modelo };
      concesionario.coches.push(nuevoCoche);

      return concesionario.save();
    })
    .then((data) => response.json(data))
    .catch((error) => response.status(500).json({ message: error }));
});

// Obtener el coche cuyo id sea cocheId, del concesionario pasado por id
app.get("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const cocheId = request.params.cocheId;

  concesionariosSchema
    .findById(id)
    .then((concesionario) => {
      if (!concesionario) {
        return response.status(404).json({ message: "Concesionario no encontrado" });
      }

      const coche = concesionario.coches[cocheId];
      response.json({ coche });
    })
    .catch((error) => response.json({ message: error }));
});

// Actualizar el coche cuyo id sea cocheId, del concesionario pasado por id
app.put("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const cocheId = request.params.cocheId;
  const { marca, modelo } = request.body;

  concesionariosSchema
    .findById(id)
    .then((concesionario) => {
      if (!concesionario) {
        return response.status(404).json({ message: "Concesionario no encontrado" });
      }

      // Actualizar los datos del coche en el array existente
      concesionario.coches[cocheId] = { marca, modelo };

      // Actualizar la propiedad 'coches' con el array modificado
      return concesionario.save();
    })
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

// Borrar el coche cuyo id sea cocheId, del concesionario pasado por id
app.delete("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const cocheId = request.params.cocheId;

  concesionariosSchema
    .findById(id)
    .then((concesionario) => {
      if (!concesionario) {
        return response.status(404).json({ message: "Concesionario no encontrado" });
      }

      // Verificar si el índice es válido
      if (cocheId < 0 || cocheId >= concesionario.coches.length) {
        return response.status(400).json({ message: "Índice de coche no válido" });
      }

      // Eliminar el coche específico del array
      concesionario.coches.splice(cocheId, 1);

      // Actualizar la propiedad 'coches' con el array modificado
      return concesionario.save();
    }) 
    .then((data) => response.json(data))
    .catch((error) => response.json({ message: error }));
});

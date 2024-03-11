const express = require("express");
const axios = require("axios");

const app = express();

//configuracion json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/", (req, res) => {
  console.log("ruta de bienvenida");
  res.status(200).json({ mensaje: "Hola mundo" });
});

app.get("/api/suma", (req, res) => {
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);

  if (!isNaN(num1) && !isNaN(num2)) {
    const resultado = num1 + num2;
    res.status(200).json({ resultado: resultado });
  } else {
    res.status(400).json({ error: "Por favor, envía dos números válidos." });
  }
});

app.get("/api/usuario/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  res.status(200).json({ usuario: nombre });
});

app.get("/api/swapi/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
    res.status(200).json({ personaje: response.data });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: "Personaje no encontrado" });
    } else {
      res.status(500).json({ error: "Error al consultar la API de SWAPI" });
    }
  }
});

app.put("/api/body", (req, res) => {
  const body = req.body;
  res.status(200).json(body);
});

app.post("/api/suma", (req, res) => {
  const { num1, num2 } = req.body;
  if (typeof num1 === "number" && typeof num2 === "number") {
    // Realizamos la suma
    const resultado = num1 + num2;
    res.status(200).json({ resultado: resultado });
  } else {
    res.status(400).json({ error: "Ambos inputs deben ser números." });
  }
});

app.delete("/api/objeto/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id === 3) {
    res.status(200).send("se ha eliminado el objeto con ID 3");
  } else {
    res.status(404).send("No se encontró el objeto con el ID especificado");
  }
});

app.listen(3000, () => {
  console.log("funciona");
});

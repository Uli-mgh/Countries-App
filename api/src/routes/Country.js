const express = require("express");
const router = express.Router();

// La logica para cada ruta se encuentra en los controllers
const {
  getCountry,
  getOneCountry,
  deleteCountry,
  createCountry,
} = require("../controllers/Country.js");

// Obtengo paises
// Utilizo querys
router.get("/", getCountry);

// Utilizo params por lo que paso un id o mejor dicho paso un id por params asdasdqw
router.get("/:id", getOneCountry);

//  Posteo un nuevo pais
router.post("/", createCountry);

// Elimino un pais a travez de su id
router.delete("/:id", deleteCountry);

module.exports = router;

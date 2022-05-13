const express = require("express");
const router = express.Router();

// La logica para cada ruta se encuentra en los controllers
const {
  getActivity,
  getOneActivity,
  deleteActivity,
  createActivity,
} = require("../controllers/Activity.js");

// Obtengo Activities
// Utilizo querys
router.get("/", getActivity);

// Utilizo params por lo que paso un id o mejor dicho paso un id por params asdasdqw
router.get("/:id", getOneActivity);

//  Posteo un nuevo Activity
router.post("/", createActivity);

// Elimino un pais a travez de su id
router.delete("/:id", deleteActivity);

module.exports = router;

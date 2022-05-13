const { Router } = require("express");
// Importar todos los routers;

const countries = require("./Country.js");
const activities = require("./Activity.js");
const router = Router();

router.use("/countries", countries);
router.use("/activities", activities);

module.exports = router;

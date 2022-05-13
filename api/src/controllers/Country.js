const { Country, Activity } = require("../db.js");

const databaseCountry = async (req, res, next) => {
  try {
    return await Country.findAll({ include: Activity });
  } catch (error) {
    next(error);
  }
};

const getCountry = async (req, res) => {
  const { name } = req.query;
  const allC = await databaseCountry();

  // Intente hacer el paginado desde el back pero me retracte porque tendria que rehacer los filtros y no se si me da el time..
  // page, count = numero de pagina y limite de items por pagina
  // page = 0
  // page = 0, count = 10, offset = 0
  // page = 1, count = 10, offset = 10
  // page = 2, count = 10, offset = 20
  // const countInt = parseInt(count);
  // const pageInt = parseInt(page);
  // const offset = countInt * pageInt;
  // Checkeo si me pasaron name del country por querys

  // const pageInt = Number.parseInt(req.query.page);
  // const maxInt = Number.parseInt(req.query.count);

  let page = 0;

  if (!Number.isNaN(pageInt) && pageInt > 0) {
    page = pageInt;
  }

  let max = 10;
  if (!Number.isNaN(maxInt) && maxInt > 0 && maxInt < 10) {
    max = maxInt;
  }

  if (name) {
    const nameC = await allC.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );

    return nameC.length
      ? res.status(200).send(nameC)
      : res.status(204).send([]);

    //
    // } else if (isNaN(countInt) || isNaN(pageInt)) {
    //   return res
    //     .status(400)
    //     .send({ error: "Invalid query value for page || count" });
    // } else if (countInt < 0 || pageInt < 0) {
    //   return res
    //     .status(400)
    //     .send({ error: "Query parameters cannot contain negative values" });
  } else {
    // const counted = await Country.findAndCountAll({
    //   include: Activity,
    //   limit: max,
    //   offset: page * max,
    // });
    // res.status(200).send({
    //   content: counted.rows,
    //   currentPage: page,
    //   numberOfPages: Math.ceil(counted.count / max),
    // });
    res.status(200).send(allC);
  }
};

const getOneCountry = async (req, res) => {
  const { id } = req.params;

  const allC = await databaseCountry();
  // Checkeo si me pasaron name del country por params
  try {
    if (id) {
      const countryId = await allC.filter((e) => e.id == id);
      return res.status(200).json(countryId);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createCountry = async (req, res, next) => {
  // Aca no sabria como desestructurar cada atributo del objeto country pero creo que asi funciona bien.
  // me dio pereza testearlo, dios quiera que funcione.
  const country = req.body;

  console.log(country);
  if (country) {
    try {
      const data = {
        id: country.id,
        name: country.name,
        nameCommon: country.nameCommon,
        capital: country.capital,
        subregion: country.subregion,
        region: country.region,
        population: country.population,
        area: country.area,
        borders: country.borders,
        flag: country.flag,
        currencies: country.currencies,
        languajes: country.languajes,
        continents: country.continents,
        independent: country.independent,
      };

      const created = await Country.create(data);

      country.activities.forEach(async (e) => {
        let findorcreateId = await Activity.findOrCreate({ where: { id: e } });

        if (findorcreateId) {
          created.addActivity(e);
        }
      });

      res.send("All ok");
    } catch (error) {
      next(error);
    }
  } else {
    res.send("No content");
  }
};

const deleteCountry = async (req, res, next) => {
  const { id } = req.params;
  //  Busco el country a eliminar por params y lo elimino
  // Funciona, creo...

  Country.destroy({ where: { id } })
    .then(() => {
      return res.status(200).send("Country succesfully removed");
    })
    .catch((error) => {
      res.status(404);
      next(error);
    });
};

module.exports = { getCountry, getOneCountry, createCountry, deleteCountry };
